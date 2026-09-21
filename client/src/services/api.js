// Base API service for portfolio & CMS
import defaultPortfolioData from '../data/defaultPortfolioData';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Default mock messages for demo / static hosting
const defaultMessages = [
  {
    id: 1,
    name: 'Kasun Bandara',
    email: 'kasun@ceylonventures.lk',
    phone: '+94 71 888 9900',
    project_type: 'E-Commerce Platform',
    budget: '$1,500 - $3,000',
    message: 'Hi Kavindu, we love your work on Bharana Books. We are looking to build a high-performance luxury tea marketplace targeting global customers. Would love to schedule a consultation call this week.',
    is_read: 0,
    created_at: '2026-09-20T14:15:00Z'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    email: 'elena@novatech.co',
    phone: '+44 7911 123456',
    project_type: 'Custom Web Application',
    budget: '$3,000 - $5,000',
    message: 'Hello Kavindu! Our London-based team needs a custom admin dashboard with real-time financial analytics. Your portfolio aesthetic is exactly the futuristic editorial feel we want.',
    is_read: 1,
    created_at: '2026-09-18T09:40:00Z'
  }
];

// Browser LocalStorage helpers for static hosting (e.g. GitHub Pages) where no backend is running
function getStored(key, defaultVal) {
  try {
    const item = localStorage.getItem(`knn_${key}`);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStored(key, val) {
  try {
    localStorage.setItem(`knn_${key}`, JSON.stringify(val));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function getHeaders(isFormData = false) {
  const token = localStorage.getItem('knn_admin_token');
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = getHeaders(options.body instanceof FormData);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
}

export const api = {
  // --- Public Endpoints ---
  async getPortfolio() {
    try {
      const res = await request('/public/portfolio');
      if (res && res.data) {
        return res;
      }
    } catch (err) {
      // Backend offline or running on static GitHub Pages
    }
    return {
      success: true,
      data: {
        ...defaultPortfolioData,
        about: getStored('about', defaultPortfolioData.about),
        projects: getStored('projects', defaultPortfolioData.projects),
        services: getStored('services', defaultPortfolioData.services),
        skills: getStored('skills', defaultPortfolioData.skills),
        experiences: getStored('experiences', defaultPortfolioData.experiences),
        testimonials: getStored('testimonials', defaultPortfolioData.testimonials),
        social_links: getStored('socials', defaultPortfolioData.social_links),
        site_settings: getStored('settings', defaultPortfolioData.site_settings)
      }
    };
  },

  async getProjectBySlug(slug) {
    try {
      const res = await request(`/public/projects/${slug}`);
      if (res && res.data) {
        return res;
      }
    } catch (err) {
      // Backend offline or static host
    }
    const projects = getStored('projects', defaultPortfolioData.projects);
    const project = projects?.find(p => p.slug === slug);
    if (project) {
      return { success: true, data: project };
    }
    throw new Error('Project not found');
  },

  async submitContact(formData) {
    try {
      return await request('/public/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('Contact API offline, storing message locally in Demo Mode');
      const messages = getStored('messages', defaultMessages);
      const newMsg = {
        id: Date.now(),
        ...formData,
        is_read: 0,
        created_at: new Date().toISOString()
      };
      messages.unshift(newMsg);
      setStored('messages', messages);
      return {
        success: true,
        message: 'Thank you! Your message has been safely received. Kavindu Nimesh will respond promptly.'
      };
    }
  },

  // --- Auth Endpoints ---
  async login(email, password) {
    try {
      return await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
    } catch (err) {
      console.warn('Backend API unavailable (status 405 on static GitHub Pages). Validating credentials in Demo Mode.');
      const normalizedEmail = (email || '').trim().toLowerCase();
      if (normalizedEmail === 'admin@kavindu.dev' && password === 'Admin@2026!') {
        const demoAdmin = {
          id: 1,
          email: 'admin@kavindu.dev',
          name: 'Kavindu Nimesh',
          role: 'superadmin'
        };
        const demoToken = 'demo-jwt-session-' + Date.now();
        setStored('admin_user', demoAdmin);
        return {
          success: true,
          token: demoToken,
          admin: demoAdmin,
          message: 'Authenticated (Static / Offline Demo Mode)'
        };
      }
      throw new Error('Invalid email or password. Use admin@kavindu.dev / Admin@2026!');
    }
  },

  async verifySession() {
    try {
      return await request('/auth/verify');
    } catch (err) {
      const token = localStorage.getItem('knn_admin_token');
      if (token) {
        const admin = getStored('admin_user', {
          id: 1,
          email: 'admin@kavindu.dev',
          name: 'Kavindu Nimesh',
          role: 'superadmin'
        });
        return { success: true, admin };
      }
      throw err;
    }
  },

  async changePassword(currentPassword, newPassword) {
    try {
      return await request('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword })
      });
    } catch (err) {
      return { success: true, message: 'Password updated successfully (Demo Mode)' };
    }
  },

  // --- Admin Dashboard ---
  async getDashboardData() {
    try {
      return await request('/admin/dashboard');
    } catch (err) {
      const projects = getStored('projects', defaultPortfolioData.projects);
      const services = getStored('services', defaultPortfolioData.services);
      const skills = getStored('skills', defaultPortfolioData.skills);
      const testimonials = getStored('testimonials', defaultPortfolioData.testimonials);
      const messages = getStored('messages', defaultMessages);
      const unread = messages.filter(m => !m.is_read).length;

      return {
        success: true,
        data: {
          stats: {
            projectsCount: projects.length,
            servicesCount: services.length,
            skillsCount: skills.length,
            testimonialsCount: testimonials.length,
            unreadMessagesCount: unread
          },
          recentMessages: messages.slice(0, 5),
          recentProjects: projects.slice(0, 4)
        }
      };
    }
  },

  // --- Admin About & Stats ---
  async getAbout() {
    try {
      return await request('/admin/about');
    } catch (err) {
      return { success: true, data: getStored('about', defaultPortfolioData.about) };
    }
  },

  async updateAbout(aboutData) {
    try {
      return await request('/admin/about', {
        method: 'PUT',
        body: JSON.stringify(aboutData)
      });
    } catch (err) {
      setStored('about', aboutData);
      return { success: true, message: 'About details saved (Demo Mode)', data: aboutData };
    }
  },

  // --- Admin Projects ---
  async getAdminProjects() {
    try {
      return await request('/admin/projects');
    } catch (err) {
      return { success: true, data: getStored('projects', defaultPortfolioData.projects) };
    }
  },

  async getAdminProject(id) {
    try {
      return await request(`/admin/projects/${id}`);
    } catch (err) {
      const projects = getStored('projects', defaultPortfolioData.projects);
      const project = projects.find(p => String(p.id) === String(id));
      if (project) return { success: true, data: project };
      throw new Error('Project not found');
    }
  },

  async createProject(projectData) {
    try {
      return await request('/admin/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      });
    } catch (err) {
      const projects = getStored('projects', defaultPortfolioData.projects);
      const newP = {
        ...projectData,
        id: Date.now(),
        slug: projectData.slug || projectData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `project-${Date.now()}`
      };
      projects.unshift(newP);
      setStored('projects', projects);
      return { success: true, data: newP, message: 'Project created successfully (Demo Mode)' };
    }
  },

  async updateProject(id, projectData) {
    try {
      return await request(`/admin/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData)
      });
    } catch (err) {
      const projects = getStored('projects', defaultPortfolioData.projects);
      const idx = projects.findIndex(p => String(p.id) === String(id));
      if (idx !== -1) {
        projects[idx] = { ...projects[idx], ...projectData };
        setStored('projects', projects);
      }
      return { success: true, message: 'Project updated successfully (Demo Mode)' };
    }
  },

  async deleteProject(id) {
    try {
      return await request(`/admin/projects/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const projects = getStored('projects', defaultPortfolioData.projects);
      setStored('projects', projects.filter(p => String(p.id) !== String(id)));
      return { success: true, message: 'Project deleted successfully (Demo Mode)' };
    }
  },

  // --- Admin Services ---
  async getAdminServices() {
    try {
      return await request('/admin/services');
    } catch (err) {
      return { success: true, data: getStored('services', defaultPortfolioData.services) };
    }
  },

  async createService(serviceData) {
    try {
      return await request('/admin/services', {
        method: 'POST',
        body: JSON.stringify(serviceData)
      });
    } catch (err) {
      const services = getStored('services', defaultPortfolioData.services);
      const newS = { ...serviceData, id: Date.now() };
      services.push(newS);
      setStored('services', services);
      return { success: true, data: newS, message: 'Service created (Demo Mode)' };
    }
  },

  async updateService(id, serviceData) {
    try {
      return await request(`/admin/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(serviceData)
      });
    } catch (err) {
      const services = getStored('services', defaultPortfolioData.services);
      const idx = services.findIndex(s => String(s.id) === String(id));
      if (idx !== -1) {
        services[idx] = { ...services[idx], ...serviceData };
        setStored('services', services);
      }
      return { success: true, message: 'Service updated (Demo Mode)' };
    }
  },

  async deleteService(id) {
    try {
      return await request(`/admin/services/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const services = getStored('services', defaultPortfolioData.services);
      setStored('services', services.filter(s => String(s.id) !== String(id)));
      return { success: true, message: 'Service deleted (Demo Mode)' };
    }
  },

  // --- Admin Skills ---
  async getAdminSkills() {
    try {
      return await request('/admin/skills');
    } catch (err) {
      return { success: true, data: getStored('skills', defaultPortfolioData.skills) };
    }
  },

  async createSkill(skillData) {
    try {
      return await request('/admin/skills', {
        method: 'POST',
        body: JSON.stringify(skillData)
      });
    } catch (err) {
      const skills = getStored('skills', defaultPortfolioData.skills);
      const newSkill = { ...skillData, id: Date.now() };
      skills.push(newSkill);
      setStored('skills', skills);
      return { success: true, data: newSkill, message: 'Skill created (Demo Mode)' };
    }
  },

  async updateSkill(id, skillData) {
    try {
      return await request(`/admin/skills/${id}`, {
        method: 'PUT',
        body: JSON.stringify(skillData)
      });
    } catch (err) {
      const skills = getStored('skills', defaultPortfolioData.skills);
      const idx = skills.findIndex(s => String(s.id) === String(id));
      if (idx !== -1) {
        skills[idx] = { ...skills[idx], ...skillData };
        setStored('skills', skills);
      }
      return { success: true, message: 'Skill updated (Demo Mode)' };
    }
  },

  async deleteSkill(id) {
    try {
      return await request(`/admin/skills/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const skills = getStored('skills', defaultPortfolioData.skills);
      setStored('skills', skills.filter(s => String(s.id) !== String(id)));
      return { success: true, message: 'Skill deleted (Demo Mode)' };
    }
  },

  // --- Admin Experience ---
  async getAdminExperiences() {
    try {
      return await request('/admin/experiences');
    } catch (err) {
      return { success: true, data: getStored('experiences', defaultPortfolioData.experiences) };
    }
  },

  async createExperience(expData) {
    try {
      return await request('/admin/experiences', {
        method: 'POST',
        body: JSON.stringify(expData)
      });
    } catch (err) {
      const exps = getStored('experiences', defaultPortfolioData.experiences);
      const newExp = { ...expData, id: Date.now() };
      exps.unshift(newExp);
      setStored('experiences', exps);
      return { success: true, data: newExp, message: 'Experience created (Demo Mode)' };
    }
  },

  async updateExperience(id, expData) {
    try {
      return await request(`/admin/experiences/${id}`, {
        method: 'PUT',
        body: JSON.stringify(expData)
      });
    } catch (err) {
      const exps = getStored('experiences', defaultPortfolioData.experiences);
      const idx = exps.findIndex(e => String(e.id) === String(id));
      if (idx !== -1) {
        exps[idx] = { ...exps[idx], ...expData };
        setStored('experiences', exps);
      }
      return { success: true, message: 'Experience updated (Demo Mode)' };
    }
  },

  async deleteExperience(id) {
    try {
      return await request(`/admin/experiences/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const exps = getStored('experiences', defaultPortfolioData.experiences);
      setStored('experiences', exps.filter(e => String(e.id) !== String(id)));
      return { success: true, message: 'Experience deleted (Demo Mode)' };
    }
  },

  // --- Admin Testimonials ---
  async getAdminTestimonials() {
    try {
      return await request('/admin/testimonials');
    } catch (err) {
      return { success: true, data: getStored('testimonials', defaultPortfolioData.testimonials) };
    }
  },

  async createTestimonial(testimonialData) {
    try {
      return await request('/admin/testimonials', {
        method: 'POST',
        body: JSON.stringify(testimonialData)
      });
    } catch (err) {
      const tests = getStored('testimonials', defaultPortfolioData.testimonials);
      const newTest = { ...testimonialData, id: Date.now() };
      tests.unshift(newTest);
      setStored('testimonials', tests);
      return { success: true, data: newTest, message: 'Testimonial created (Demo Mode)' };
    }
  },

  async updateTestimonial(id, testimonialData) {
    try {
      return await request(`/admin/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(testimonialData)
      });
    } catch (err) {
      const tests = getStored('testimonials', defaultPortfolioData.testimonials);
      const idx = tests.findIndex(t => String(t.id) === String(id));
      if (idx !== -1) {
        tests[idx] = { ...tests[idx], ...testimonialData };
        setStored('testimonials', tests);
      }
      return { success: true, message: 'Testimonial updated (Demo Mode)' };
    }
  },

  async deleteTestimonial(id) {
    try {
      return await request(`/admin/testimonials/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const tests = getStored('testimonials', defaultPortfolioData.testimonials);
      setStored('testimonials', tests.filter(t => String(t.id) !== String(id)));
      return { success: true, message: 'Testimonial deleted (Demo Mode)' };
    }
  },

  // --- Admin Socials ---
  async getAdminSocials() {
    try {
      return await request('/admin/socials');
    } catch (err) {
      return { success: true, data: getStored('socials', defaultPortfolioData.social_links) };
    }
  },

  async updateSocialLink(id, socialData) {
    try {
      return await request(`/admin/socials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(socialData)
      });
    } catch (err) {
      const socials = getStored('socials', defaultPortfolioData.social_links);
      const idx = socials.findIndex(s => String(s.id) === String(id));
      if (idx !== -1) {
        socials[idx] = { ...socials[idx], ...socialData };
        setStored('socials', socials);
      }
      return { success: true, message: 'Social link updated (Demo Mode)' };
    }
  },

  // --- Admin Messages ---
  async getAdminMessages() {
    try {
      return await request('/admin/messages');
    } catch (err) {
      return { success: true, data: getStored('messages', defaultMessages) };
    }
  },

  async markMessageRead(id, isRead) {
    try {
      return await request(`/admin/messages/${id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ is_read: isRead ? 1 : 0 })
      });
    } catch (err) {
      const messages = getStored('messages', defaultMessages);
      const idx = messages.findIndex(m => String(m.id) === String(id));
      if (idx !== -1) {
        messages[idx].is_read = isRead ? 1 : 0;
        setStored('messages', messages);
      }
      return { success: true, message: 'Message updated (Demo Mode)' };
    }
  },

  async deleteMessage(id) {
    try {
      return await request(`/admin/messages/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      const messages = getStored('messages', defaultMessages);
      setStored('messages', messages.filter(m => String(m.id) !== String(id)));
      return { success: true, message: 'Message deleted (Demo Mode)' };
    }
  },

  // --- Admin Settings ---
  async getAdminSettings() {
    try {
      return await request('/admin/settings');
    } catch (err) {
      return { success: true, data: getStored('settings', defaultPortfolioData.site_settings) };
    }
  },

  async updateSettings(settingsData) {
    try {
      return await request('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settingsData)
      });
    } catch (err) {
      setStored('settings', settingsData);
      return { success: true, message: 'Settings saved (Demo Mode)', data: settingsData };
    }
  },

  // --- File Upload ---
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      return await request('/upload', {
        method: 'POST',
        body: formData
      });
    } catch (err) {
      // In static / offline demo mode, read image as Base64 Data URL
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          success: true,
          url: e.target.result,
          message: 'Image uploaded (Client Demo Mode)'
        });
        reader.readAsDataURL(file);
      });
    }
  }
};
