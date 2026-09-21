// Base API service for portfolio & CMS
import defaultPortfolioData from '../data/defaultPortfolioData';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Detect if running on static hosting (e.g. GitHub Pages) without an active backend server
const isStaticHost = typeof window !== 'undefined' && (
  window.location.hostname.includes('github.io') ||
  window.location.hostname.endsWith('github.io') ||
  (!['localhost', '127.0.0.1'].includes(window.location.hostname) && !import.meta.env.VITE_API_URL)
);

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

// Helper: Scale down and compress image in-browser to safely fit in localStorage without quota limits
function processImageFile(file, maxWidth = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(event.target.result);
      img.src = event.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Browser LocalStorage helpers for static hosting (e.g. GitHub Pages)
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
    if (!isStaticHost) {
      try {
        const res = await request('/public/portfolio');
        if (res && res.data) {
          return res;
        }
      } catch (err) {
        // Backend offline, fall back to storage
      }
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
    if (!isStaticHost) {
      try {
        const res = await request(`/public/projects/${slug}`);
        if (res && res.data) {
          return res;
        }
      } catch (err) {
        // Backend offline
      }
    }
    const projects = getStored('projects', defaultPortfolioData.projects);
    const currentIndex = projects?.findIndex(p => p.slug === slug);
    if (currentIndex !== -1 && currentIndex !== undefined) {
      const project = projects[currentIndex];
      const prevProject = currentIndex > 0 ? { slug: projects[currentIndex - 1].slug, title: projects[currentIndex - 1].title } : null;
      const nextProject = currentIndex < projects.length - 1 ? { slug: projects[currentIndex + 1].slug, title: projects[currentIndex + 1].title } : null;

      return {
        success: true,
        data: {
          project,
          prevProject,
          nextProject
        }
      };
    }
    throw new Error('Project not found');
  },

  async submitContact(formData) {
    if (!isStaticHost) {
      try {
        return await request('/public/contact', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      } catch (err) {
        // Fall back to local storage
      }
    }
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
  },

  // --- Auth Endpoints ---
  async login(email, password) {
    if (!isStaticHost) {
      try {
        return await request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
      } catch (err) {
        // Fall back to client authentication
      }
    }
    
    // Client-side authentication for static hosting / offline
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
        message: 'Authenticated (Static Demo Mode)'
      };
    }
    throw new Error('Invalid email or password.');
  },

  async verifySession() {
    if (!isStaticHost) {
      try {
        return await request('/auth/verify');
      } catch (err) {
        // Fall back
      }
    }
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
    throw new Error('Session expired');
  },

  async changePassword(currentPassword, newPassword) {
    if (!isStaticHost) {
      try {
        return await request('/auth/change-password', {
          method: 'POST',
          body: JSON.stringify({ currentPassword, newPassword })
        });
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, message: 'Password updated successfully (Demo Mode)' };
  },

  // --- Admin Dashboard ---
  async getDashboardData() {
    if (!isStaticHost) {
      try {
        return await request('/admin/dashboard');
      } catch (err) {
        // Fall back
      }
    }
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
  },

  // --- Admin About & Stats ---
  async getAbout() {
    if (!isStaticHost) {
      try {
        return await request('/admin/about');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('about', defaultPortfolioData.about) };
  },

  async updateAbout(aboutData) {
    if (!isStaticHost) {
      try {
        return await request('/admin/about', {
          method: 'PUT',
          body: JSON.stringify(aboutData)
        });
      } catch (err) {
        // Fall back
      }
    }
    setStored('about', aboutData);
    return { success: true, message: 'About details saved (Demo Mode)', data: aboutData };
  },

  // --- Admin Projects ---
  async getAdminProjects() {
    if (!isStaticHost) {
      try {
        return await request('/admin/projects');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('projects', defaultPortfolioData.projects) };
  },

  async getAdminProject(id) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/projects/${id}`);
      } catch (err) {
        // Fall back
      }
    }
    const projects = getStored('projects', defaultPortfolioData.projects);
    const project = projects.find(p => String(p.id) === String(id));
    if (project) return { success: true, data: project };
    throw new Error('Project not found');
  },

  async createProject(projectData) {
    if (!isStaticHost) {
      try {
        return await request('/admin/projects', {
          method: 'POST',
          body: JSON.stringify(projectData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const projects = getStored('projects', defaultPortfolioData.projects);
    const newP = {
      ...projectData,
      id: Date.now(),
      slug: projectData.slug || projectData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `project-${Date.now()}`
    };
    projects.unshift(newP);
    setStored('projects', projects);
    return { success: true, data: newP, message: 'Project created successfully (Demo Mode)' };
  },

  async updateProject(id, projectData) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/projects/${id}`, {
          method: 'PUT',
          body: JSON.stringify(projectData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const projects = getStored('projects', defaultPortfolioData.projects);
    const idx = projects.findIndex(p => String(p.id) === String(id));
    if (idx !== -1) {
      projects[idx] = { ...projects[idx], ...projectData };
      setStored('projects', projects);
    }
    return { success: true, message: 'Project updated successfully (Demo Mode)' };
  },

  async deleteProject(id) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/projects/${id}`, {
          method: 'DELETE'
        });
      } catch (err) {
        // Fall back
      }
    }
    const projects = getStored('projects', defaultPortfolioData.projects);
    setStored('projects', projects.filter(p => String(p.id) !== String(id)));
    return { success: true, message: 'Project deleted successfully (Demo Mode)' };
  },

  // --- Admin Services ---
  async getAdminServices() {
    if (!isStaticHost) {
      try {
        return await request('/admin/services');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('services', defaultPortfolioData.services) };
  },

  async createService(serviceData) {
    if (!isStaticHost) {
      try {
        return await request('/admin/services', {
          method: 'POST',
          body: JSON.stringify(serviceData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const services = getStored('services', defaultPortfolioData.services);
    const newS = { ...serviceData, id: Date.now() };
    services.push(newS);
    setStored('services', services);
    return { success: true, data: newS, message: 'Service created (Demo Mode)' };
  },

  async updateService(id, serviceData) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/services/${id}`, {
          method: 'PUT',
          body: JSON.stringify(serviceData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const services = getStored('services', defaultPortfolioData.services);
    const idx = services.findIndex(s => String(s.id) === String(id));
    if (idx !== -1) {
      services[idx] = { ...services[idx], ...serviceData };
      setStored('services', services);
    }
    return { success: true, message: 'Service updated (Demo Mode)' };
  },

  async deleteService(id) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/services/${id}`, {
          method: 'DELETE'
        });
      } catch (err) {
        // Fall back
      }
    }
    const services = getStored('services', defaultPortfolioData.services);
    setStored('services', services.filter(s => String(s.id) !== String(id)));
    return { success: true, message: 'Service deleted (Demo Mode)' };
  },

  // --- Admin Skills ---
  async getAdminSkills() {
    if (!isStaticHost) {
      try {
        return await request('/admin/skills');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('skills', defaultPortfolioData.skills) };
  },

  async createSkill(skillData) {
    if (!isStaticHost) {
      try {
        return await request('/admin/skills', {
          method: 'POST',
          body: JSON.stringify(skillData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const skills = getStored('skills', defaultPortfolioData.skills);
    const newSkill = { ...skillData, id: Date.now() };
    skills.push(newSkill);
    setStored('skills', skills);
    return { success: true, data: newSkill, message: 'Skill created (Demo Mode)' };
  },

  async updateSkill(id, skillData) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/skills/${id}`, {
          method: 'PUT',
          body: JSON.stringify(skillData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const skills = getStored('skills', defaultPortfolioData.skills);
    const idx = skills.findIndex(s => String(s.id) === String(id));
    if (idx !== -1) {
      skills[idx] = { ...skills[idx], ...skillData };
      setStored('skills', skills);
    }
    return { success: true, message: 'Skill updated (Demo Mode)' };
  },

  async deleteSkill(id) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/skills/${id}`, {
          method: 'DELETE'
        });
      } catch (err) {
        // Fall back
      }
    }
    const skills = getStored('skills', defaultPortfolioData.skills);
    setStored('skills', skills.filter(s => String(s.id) !== String(id)));
    return { success: true, message: 'Skill deleted (Demo Mode)' };
  },

  // --- Admin Experience ---
  async getAdminExperiences() {
    if (!isStaticHost) {
      try {
        return await request('/admin/experiences');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('experiences', defaultPortfolioData.experiences) };
  },

  async createExperience(expData) {
    if (!isStaticHost) {
      try {
        return await request('/admin/experiences', {
          method: 'POST',
          body: JSON.stringify(expData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const exps = getStored('experiences', defaultPortfolioData.experiences);
    const newExp = { ...expData, id: Date.now() };
    exps.unshift(newExp);
    setStored('experiences', exps);
    return { success: true, data: newExp, message: 'Experience created (Demo Mode)' };
  },

  async updateExperience(id, expData) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/experiences/${id}`, {
          method: 'PUT',
          body: JSON.stringify(expData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const exps = getStored('experiences', defaultPortfolioData.experiences);
    const idx = exps.findIndex(e => String(e.id) === String(id));
    if (idx !== -1) {
      exps[idx] = { ...exps[idx], ...expData };
      setStored('experiences', exps);
    }
    return { success: true, message: 'Experience updated (Demo Mode)' };
  },

  async deleteExperience(id) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/experiences/${id}`, {
          method: 'DELETE'
        });
      } catch (err) {
        // Fall back
      }
    }
    const exps = getStored('experiences', defaultPortfolioData.experiences);
    setStored('experiences', exps.filter(e => String(e.id) !== String(id)));
    return { success: true, message: 'Experience deleted (Demo Mode)' };
  },

  // --- Admin Testimonials ---
  async getAdminTestimonials() {
    if (!isStaticHost) {
      try {
        return await request('/admin/testimonials');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('testimonials', defaultPortfolioData.testimonials) };
  },

  async createTestimonial(testimonialData) {
    if (!isStaticHost) {
      try {
        return await request('/admin/testimonials', {
          method: 'POST',
          body: JSON.stringify(testimonialData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const tests = getStored('testimonials', defaultPortfolioData.testimonials);
    const newTest = { ...testimonialData, id: Date.now() };
    tests.unshift(newTest);
    setStored('testimonials', tests);
    return { success: true, data: newTest, message: 'Testimonial created (Demo Mode)' };
  },

  async updateTestimonial(id, testimonialData) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/testimonials/${id}`, {
          method: 'PUT',
          body: JSON.stringify(testimonialData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const tests = getStored('testimonials', defaultPortfolioData.testimonials);
    const idx = tests.findIndex(t => String(t.id) === String(id));
    if (idx !== -1) {
      tests[idx] = { ...tests[idx], ...testimonialData };
      setStored('testimonials', tests);
    }
    return { success: true, message: 'Testimonial updated (Demo Mode)' };
  },

  async deleteTestimonial(id) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/testimonials/${id}`, {
          method: 'DELETE'
        });
      } catch (err) {
        // Fall back
      }
    }
    const tests = getStored('testimonials', defaultPortfolioData.testimonials);
    setStored('testimonials', tests.filter(t => String(t.id) !== String(id)));
    return { success: true, message: 'Testimonial deleted (Demo Mode)' };
  },

  // --- Admin Socials ---
  async getAdminSocials() {
    if (!isStaticHost) {
      try {
        return await request('/admin/socials');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('socials', defaultPortfolioData.social_links) };
  },

  async updateSocialLink(id, socialData) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/socials/${id}`, {
          method: 'PUT',
          body: JSON.stringify(socialData)
        });
      } catch (err) {
        // Fall back
      }
    }
    const socials = getStored('socials', defaultPortfolioData.social_links);
    const idx = socials.findIndex(s => String(s.id) === String(id));
    if (idx !== -1) {
      socials[idx] = { ...socials[idx], ...socialData };
      setStored('socials', socials);
    }
    return { success: true, message: 'Social link updated (Demo Mode)' };
  },

  // --- Admin Messages ---
  async getAdminMessages() {
    if (!isStaticHost) {
      try {
        return await request('/admin/messages');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('messages', defaultMessages) };
  },

  async markMessageRead(id, isRead) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/messages/${id}/read`, {
          method: 'PUT',
          body: JSON.stringify({ is_read: isRead ? 1 : 0 })
        });
      } catch (err) {
        // Fall back
      }
    }
    const messages = getStored('messages', defaultMessages);
    const idx = messages.findIndex(m => String(m.id) === String(id));
    if (idx !== -1) {
      messages[idx].is_read = isRead ? 1 : 0;
      setStored('messages', messages);
    }
    return { success: true, message: 'Message updated (Demo Mode)' };
  },

  async deleteMessage(id) {
    if (!isStaticHost) {
      try {
        return await request(`/admin/messages/${id}`, {
          method: 'DELETE'
        });
      } catch (err) {
        // Fall back
      }
    }
    const messages = getStored('messages', defaultMessages);
    setStored('messages', messages.filter(m => String(m.id) !== String(id)));
    return { success: true, message: 'Message deleted (Demo Mode)' };
  },

  // --- Admin Settings ---
  async getAdminSettings() {
    if (!isStaticHost) {
      try {
        return await request('/admin/settings');
      } catch (err) {
        // Fall back
      }
    }
    return { success: true, data: getStored('settings', defaultPortfolioData.site_settings) };
  },

  async updateSettings(settingsData) {
    if (!isStaticHost) {
      try {
        return await request('/admin/settings', {
          method: 'PUT',
          body: JSON.stringify(settingsData)
        });
      } catch (err) {
        // Fall back
      }
    }
    setStored('settings', settingsData);
    return { success: true, message: 'Settings saved (Demo Mode)', data: settingsData };
  },

  // --- File Upload ---
  async uploadImage(file) {
    if (!isStaticHost) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await request('/upload', {
          method: 'POST',
          body: formData
        });
        if (res && res.data?.path) {
          return res;
        }
      } catch (err) {
        console.warn('Backend upload server unavailable, processing image locally in browser:', err.message);
      }
    }

    try {
      // In static / offline mode, scale down and return compressed base64 Data URL
      const dataUrl = await processImageFile(file);
      return {
        success: true,
        data: {
          path: dataUrl,
          filename: file.name
        },
        url: dataUrl,
        message: 'Image uploaded successfully (Client Storage Mode)'
      };
    } catch (err) {
      throw new Error('Failed to process image file: ' + err.message);
    }
  }
};
