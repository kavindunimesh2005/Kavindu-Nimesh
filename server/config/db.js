const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const DB_TYPE = process.env.DB_TYPE || 'sqlite';
const DB_FILE = path.join(__dirname, '../database/db.json');

// Memory cache & lock for file DB operations
let localDb = null;

function loadLocalDb() {
  if (localDb) return localDb;
  if (!fs.existsSync(DB_FILE)) {
    // If not exists, seed initial structure
    localDb = {
      admins: [],
      about: null,
      projects: [],
      services: [],
      skills: [],
      experiences: [],
      testimonials: [],
      social_links: [],
      messages: [],
      site_settings: {}
    };
    saveLocalDb();
  } else {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      localDb = JSON.parse(raw);
    } catch (err) {
      console.error('Error reading db.json:', err);
      localDb = {};
    }
  }
  return localDb;
}

function saveLocalDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(localDb, null, 2), 'utf8');
}

// MySQL pool connection if configured
let mysqlPool = null;
if (DB_TYPE === 'mysql') {
  try {
    const mysql = require('mysql2/promise');
    mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kavindu_portfolio',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('🔗 MySQL configured for', process.env.DB_NAME || 'kavindu_portfolio');
  } catch (err) {
    console.warn('⚠️ Could not initialize MySQL pool. Falling back to local database engine.', err.message);
  }
}

// ==========================================
// UNIFIED DATABASE SERVICE
// ==========================================
const db = {
  getDbMode: () => (mysqlPool ? 'mysql' : 'sqlite-embedded'),

  // --- ADMINS ---
  async findAdminByEmail(email) {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM admins WHERE email = ? LIMIT 1', [email]);
        return rows[0] || null;
      } catch (e) {
        console.warn('MySQL error in findAdminByEmail, using local DB:', e.message);
      }
    }
    const data = loadLocalDb();
    return data.admins?.find(a => a.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async updateAdminPassword(id, hashedPassword) {
    if (mysqlPool) {
      try {
        await mysqlPool.query('UPDATE admins SET password = ? WHERE id = ?', [hashedPassword, id]);
        return true;
      } catch (e) {
        console.warn('MySQL error in updateAdminPassword, using local DB:', e.message);
      }
    }
    const data = loadLocalDb();
    const admin = data.admins?.find(a => a.id === id || a.id === parseInt(id, 10));
    if (admin) {
      admin.password = hashedPassword;
      saveLocalDb();
      return true;
    }
    return false;
  },

  // --- ABOUT ---
  async getAbout() {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM about LIMIT 1');
        if (rows.length > 0) return rows[0];
      } catch (e) {
        console.warn('MySQL error in getAbout, using local DB:', e.message);
      }
    }
    const data = loadLocalDb();
    return data.about;
  },

  async updateAbout(fields) {
    if (mysqlPool) {
      try {
        const keys = Object.keys(fields);
        const values = Object.values(fields);
        const setClause = keys.map(k => `\`${k}\` = ?`).join(', ');
        await mysqlPool.query(`UPDATE about SET ${setClause} WHERE id = 1`, values);
        return await this.getAbout();
      } catch (e) {
        console.warn('MySQL error in updateAbout, using local DB:', e.message);
      }
    }
    const data = loadLocalDb();
    data.about = { ...(data.about || {}), ...fields, updated_at: new Date().toISOString() };
    saveLocalDb();
    return data.about;
  },

  // --- PROJECTS ---
  async getProjects({ featuredOnly = false, category = null, includeUnpublished = false } = {}) {
    if (mysqlPool) {
      try {
        let sql = 'SELECT * FROM projects WHERE 1=1';
        const params = [];
        if (!includeUnpublished) {
          sql += ' AND is_published = 1';
        }
        if (featuredOnly) {
          sql += ' AND is_featured = 1';
        }
        if (category && category !== 'All') {
          sql += ' AND category = ?';
          params.push(category);
        }
        sql += ' ORDER BY display_order ASC, created_at DESC';
        const [rows] = await mysqlPool.query(sql, params);
        return rows.map(r => ({
          ...r,
          features: typeof r.features === 'string' ? JSON.parse(r.features || '[]') : r.features,
          technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies,
          gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery || '[]') : r.gallery,
        }));
      } catch (e) {
        console.warn('MySQL error in getProjects, using local DB:', e.message);
      }
    }
    const data = loadLocalDb();
    let list = data.projects || [];
    if (!includeUnpublished) {
      list = list.filter(p => p.is_published);
    }
    if (featuredOnly) {
      list = list.filter(p => p.is_featured);
    }
    if (category && category !== 'All') {
      list = list.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    return [...list].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  },

  async getProjectBySlug(slug) {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM projects WHERE slug = ? LIMIT 1', [slug]);
        if (rows.length > 0) {
          const r = rows[0];
          return {
            ...r,
            features: typeof r.features === 'string' ? JSON.parse(r.features || '[]') : r.features,
            technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies,
            gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery || '[]') : r.gallery,
          };
        }
      } catch (e) {
        console.warn('MySQL error in getProjectBySlug, using local DB:', e.message);
      }
    }
    const data = loadLocalDb();
    return data.projects?.find(p => p.slug === slug) || null;
  },

  async getProjectById(id) {
    const numId = parseInt(id, 10);
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [numId]);
        if (rows.length > 0) {
          const r = rows[0];
          return {
            ...r,
            features: typeof r.features === 'string' ? JSON.parse(r.features || '[]') : r.features,
            technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies,
            gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery || '[]') : r.gallery,
          };
        }
      } catch (e) {
        console.warn('MySQL error in getProjectById, using local DB:', e.message);
      }
    }
    const data = loadLocalDb();
    return data.projects?.find(p => p.id === numId) || null;
  },

  async createProject(item) {
    const data = loadLocalDb();
    const newId = (data.projects?.reduce((max, p) => Math.max(max, p.id || 0), 0) || 0) + 1;
    const project = {
      id: newId,
      slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: item.title,
      category: item.category || 'Web Application',
      client: item.client || 'Client Project',
      industry: item.industry || 'Technology',
      year: item.year || new Date().getFullYear().toString(),
      timeline: item.timeline || '6 Weeks',
      short_description: item.short_description || '',
      full_description: item.full_description || '',
      challenge: item.challenge || '',
      solution: item.solution || '',
      features: Array.isArray(item.features) ? item.features : [],
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
      live_url: item.live_url || '',
      github_url: item.github_url || '',
      image_url: item.image_url || '/uploads/sample-project.jpg',
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      results: item.results || '',
      client_feedback: item.client_feedback || '',
      is_featured: item.is_featured !== undefined ? (item.is_featured ? 1 : 0) : 1,
      is_published: item.is_published !== undefined ? (item.is_published ? 1 : 0) : 1,
      display_order: parseInt(item.display_order || 0, 10),
      created_at: new Date().toISOString()
    };

    if (mysqlPool) {
      try {
        await mysqlPool.query(
          `INSERT INTO projects (slug, title, category, client, industry, year, timeline, short_description, full_description, challenge, solution, features, technologies, live_url, github_url, image_url, gallery, results, client_feedback, is_featured, is_published, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            project.slug, project.title, project.category, project.client, project.industry,
            project.year, project.timeline, project.short_description, project.full_description,
            project.challenge, project.solution, JSON.stringify(project.features), JSON.stringify(project.technologies),
            project.live_url, project.github_url, project.image_url, JSON.stringify(project.gallery),
            project.results, project.client_feedback, project.is_featured, project.is_published, project.display_order
          ]
        );
      } catch (e) {
        console.warn('MySQL insert error, saved locally:', e.message);
      }
    }

    data.projects = data.projects || [];
    data.projects.push(project);
    saveLocalDb();
    return project;
  },

  async updateProject(id, fields) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    const idx = data.projects?.findIndex(p => p.id === numId);
    if (idx === -1 || idx === undefined) return null;

    const updated = { ...data.projects[idx], ...fields, updated_at: new Date().toISOString() };
    if (fields.display_order !== undefined) updated.display_order = parseInt(fields.display_order, 10);
    if (fields.is_featured !== undefined) updated.is_featured = fields.is_featured ? 1 : 0;
    if (fields.is_published !== undefined) updated.is_published = fields.is_published ? 1 : 0;
    if (fields.features && !Array.isArray(fields.features)) {
      try { updated.features = JSON.parse(fields.features); } catch (e) { updated.features = []; }
    }
    if (fields.technologies && !Array.isArray(fields.technologies)) {
      try { updated.technologies = JSON.parse(fields.technologies); } catch (e) { updated.technologies = []; }
    }

    if (mysqlPool) {
      try {
        const copy = { ...fields };
        if (copy.features) copy.features = JSON.stringify(copy.features);
        if (copy.technologies) copy.technologies = JSON.stringify(copy.technologies);
        if (copy.gallery) copy.gallery = JSON.stringify(copy.gallery);
        const keys = Object.keys(copy);
        const vals = Object.values(copy);
        const setSql = keys.map(k => `\`${k}\` = ?`).join(', ');
        await mysqlPool.query(`UPDATE projects SET ${setSql} WHERE id = ?`, [...vals, numId]);
      } catch (e) {
        console.warn('MySQL update error, updated locally:', e.message);
      }
    }

    data.projects[idx] = updated;
    saveLocalDb();
    return updated;
  },

  async deleteProject(id) {
    const numId = parseInt(id, 10);
    if (mysqlPool) {
      try {
        await mysqlPool.query('DELETE FROM projects WHERE id = ?', [numId]);
      } catch (e) {
        console.warn('MySQL delete error:', e.message);
      }
    }
    const data = loadLocalDb();
    data.projects = (data.projects || []).filter(p => p.id !== numId);
    saveLocalDb();
    return true;
  },

  // --- SERVICES ---
  async getServices() {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM services ORDER BY display_order ASC');
        return rows.map(r => ({
          ...r,
          technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies
        }));
      } catch (e) {
        console.warn('MySQL services error:', e.message);
      }
    }
    const data = loadLocalDb();
    return [...(data.services || [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  },

  async createService(item) {
    const data = loadLocalDb();
    const newId = (data.services?.reduce((max, s) => Math.max(max, s.id || 0), 0) || 0) + 1;
    const s = {
      id: newId,
      service_number: item.service_number || String(newId).padStart(2, '0'),
      title: item.title,
      icon: item.icon || 'Code2',
      description: item.description,
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
      display_order: parseInt(item.display_order || 0, 10),
      is_active: item.is_active !== undefined ? (item.is_active ? 1 : 0) : 1
    };
    data.services = data.services || [];
    data.services.push(s);
    saveLocalDb();
    return s;
  },

  async updateService(id, fields) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    const idx = data.services?.findIndex(s => s.id === numId);
    if (idx === -1 || idx === undefined) return null;
    data.services[idx] = { ...data.services[idx], ...fields };
    saveLocalDb();
    return data.services[idx];
  },

  async deleteService(id) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    data.services = (data.services || []).filter(s => s.id !== numId);
    saveLocalDb();
    return true;
  },

  // --- SKILLS ---
  async getSkills() {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM skills ORDER BY category ASC, display_order ASC');
        return rows;
      } catch (e) {
        console.warn('MySQL skills error:', e.message);
      }
    }
    const data = loadLocalDb();
    return [...(data.skills || [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  },

  async createSkill(item) {
    const data = loadLocalDb();
    const newId = (data.skills?.reduce((max, s) => Math.max(max, s.id || 0), 0) || 0) + 1;
    const s = {
      id: newId,
      name: item.name,
      category: item.category || 'Frontend',
      icon: item.icon || 'Code',
      proficiency: parseInt(item.proficiency || 90, 10),
      display_order: parseInt(item.display_order || 0, 10),
      is_active: item.is_active !== undefined ? (item.is_active ? 1 : 0) : 1
    };
    data.skills = data.skills || [];
    data.skills.push(s);
    saveLocalDb();
    return s;
  },

  async updateSkill(id, fields) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    const idx = data.skills?.findIndex(s => s.id === numId);
    if (idx === -1 || idx === undefined) return null;
    data.skills[idx] = { ...data.skills[idx], ...fields };
    saveLocalDb();
    return data.skills[idx];
  },

  async deleteSkill(id) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    data.skills = (data.skills || []).filter(s => s.id !== numId);
    saveLocalDb();
    return true;
  },

  // --- EXPERIENCE ---
  async getExperiences() {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM experiences ORDER BY display_order ASC');
        return rows.map(r => ({
          ...r,
          technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies
        }));
      } catch (e) {
        console.warn('MySQL experiences error:', e.message);
      }
    }
    const data = loadLocalDb();
    return [...(data.experiences || [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  },

  async createExperience(item) {
    const data = loadLocalDb();
    const newId = (data.experiences?.reduce((max, e) => Math.max(max, e.id || 0), 0) || 0) + 1;
    const exp = {
      id: newId,
      company: item.company,
      position: item.position,
      period: item.period,
      description: item.description,
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
      display_order: parseInt(item.display_order || 0, 10)
    };
    data.experiences = data.experiences || [];
    data.experiences.push(exp);
    saveLocalDb();
    return exp;
  },

  async updateExperience(id, fields) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    const idx = data.experiences?.findIndex(e => e.id === numId);
    if (idx === -1 || idx === undefined) return null;
    data.experiences[idx] = { ...data.experiences[idx], ...fields };
    saveLocalDb();
    return data.experiences[idx];
  },

  async deleteExperience(id) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    data.experiences = (data.experiences || []).filter(e => e.id !== numId);
    saveLocalDb();
    return true;
  },

  // --- TESTIMONIALS ---
  async getTestimonials({ activeOnly = false } = {}) {
    if (mysqlPool) {
      try {
        let sql = 'SELECT * FROM testimonials';
        if (activeOnly) sql += ' WHERE is_active = 1';
        sql += ' ORDER BY display_order ASC';
        const [rows] = await mysqlPool.query(sql);
        return rows;
      } catch (e) {
        console.warn('MySQL testimonials error:', e.message);
      }
    }
    const data = loadLocalDb();
    let list = data.testimonials || [];
    if (activeOnly) list = list.filter(t => t.is_active);
    return [...list].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  },

  async createTestimonial(item) {
    const data = loadLocalDb();
    const newId = (data.testimonials?.reduce((max, t) => Math.max(max, t.id || 0), 0) || 0) + 1;
    const t = {
      id: newId,
      client_name: item.client_name,
      position: item.position || '',
      company: item.company || '',
      avatar_url: item.avatar_url || '/uploads/client-avatar.jpg',
      rating: parseInt(item.rating || 5, 10),
      quote: item.quote,
      is_active: item.is_active !== undefined ? (item.is_active ? 1 : 0) : 1,
      display_order: parseInt(item.display_order || 0, 10)
    };
    data.testimonials = data.testimonials || [];
    data.testimonials.push(t);
    saveLocalDb();
    return t;
  },

  async updateTestimonial(id, fields) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    const idx = data.testimonials?.findIndex(t => t.id === numId);
    if (idx === -1 || idx === undefined) return null;
    data.testimonials[idx] = { ...data.testimonials[idx], ...fields };
    saveLocalDb();
    return data.testimonials[idx];
  },

  async deleteTestimonial(id) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    data.testimonials = (data.testimonials || []).filter(t => t.id !== numId);
    saveLocalDb();
    return true;
  },

  // --- SOCIAL LINKS ---
  async getSocialLinks() {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM social_links ORDER BY display_order ASC');
        return rows;
      } catch (e) {
        console.warn('MySQL social links error:', e.message);
      }
    }
    const data = loadLocalDb();
    return [...(data.social_links || [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  },

  async updateSocialLink(id, fields) {
    const numId = parseInt(id, 10);
    const data = loadLocalDb();
    const idx = data.social_links?.findIndex(s => s.id === numId);
    if (idx === -1 || idx === undefined) return null;
    data.social_links[idx] = { ...data.social_links[idx], ...fields };
    saveLocalDb();
    return data.social_links[idx];
  },

  async updateAllSocials(links) {
    const data = loadLocalDb();
    data.social_links = links;
    saveLocalDb();
    return data.social_links;
  },

  // --- CONTACT MESSAGES ---
  async getMessages() {
    if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM messages ORDER BY created_at DESC');
        return rows;
      } catch (e) {
        console.warn('MySQL messages error:', e.message);
      }
    }
    const data = loadLocalDb();
    return [...(data.messages || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  async createMessage(item) {
    const data = loadLocalDb();
    const newId = (data.messages?.reduce((max, m) => Math.max(max, m.id || 0), 0) || 0) + 1;
    const msg = {
      id: newId,
      name: item.name,
      email: item.email,
      phone: item.phone || '',
      project_type: item.project_type || 'General Inquiry',
      budget: item.budget || 'Flexible',
      message: item.message,
      is_read: 0,
      created_at: new Date().toISOString()
    };
    if (mysqlPool) {
      try {
        await mysqlPool.query(
          'INSERT INTO messages (name, email, phone, project_type, budget, message, is_read) VALUES (?, ?, ?, ?, ?, ?, 0)',
          [msg.name, msg.email, msg.phone, msg.project_type, msg.budget, msg.message]
        );
      } catch (e) {
        console.warn('MySQL insert message error:', e.message);
      }
    }
    data.messages = data.messages || [];
    data.messages.unshift(msg);
    saveLocalDb();
    return msg;
  },

  async markMessageRead(id, isRead = 1) {
    const numId = parseInt(id, 10);
    if (mysqlPool) {
      try {
        await mysqlPool.query('UPDATE messages SET is_read = ? WHERE id = ?', [isRead ? 1 : 0, numId]);
      } catch (e) {
        console.warn('MySQL mark read error:', e.message);
      }
    }
    const data = loadLocalDb();
    const msg = data.messages?.find(m => m.id === numId);
    if (msg) {
      msg.is_read = isRead ? 1 : 0;
      saveLocalDb();
      return msg;
    }
    return null;
  },

  async deleteMessage(id) {
    const numId = parseInt(id, 10);
    if (mysqlPool) {
      try {
        await mysqlPool.query('DELETE FROM messages WHERE id = ?', [numId]);
      } catch (e) {
        console.warn('MySQL delete message error:', e.message);
      }
    }
    const data = loadLocalDb();
    data.messages = (data.messages || []).filter(m => m.id !== numId);
    saveLocalDb();
    return true;
  },

  // --- SITE SETTINGS ---
  async getSettings() {
    const data = loadLocalDb();
    return data.site_settings || {};
  },

  async updateSettings(newSettings) {
    const data = loadLocalDb();
    data.site_settings = { ...(data.site_settings || {}), ...newSettings };
    saveLocalDb();
    return data.site_settings;
  },

  // --- DASHBOARD AGGREGATE STATS ---
  async getDashboardStats() {
    const data = loadLocalDb();
    const totalProjects = data.projects?.length || 0;
    const totalServices = data.services?.length || 0;
    const totalSkills = data.skills?.length || 0;
    const totalExperience = data.experiences?.length || 0;
    const totalTestimonials = data.testimonials?.length || 0;
    const totalMessages = data.messages?.length || 0;
    const unreadMessages = data.messages?.filter(m => !m.is_read).length || 0;

    return {
      totalProjects,
      totalServices,
      totalSkills,
      totalExperience,
      totalTestimonials,
      totalMessages,
      unreadMessages
    };
  }
};

module.exports = { db, loadLocalDb, saveLocalDb };
