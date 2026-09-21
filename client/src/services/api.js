// Base API service for portfolio & CMS

const API_BASE = '/api';

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
    return request('/public/portfolio');
  },

  async getProjectBySlug(slug) {
    return request(`/public/projects/${slug}`);
  },

  async submitContact(formData) {
    return request('/public/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  // --- Auth Endpoints ---
  async login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async verifySession() {
    return request('/auth/verify');
  },

  async changePassword(currentPassword, newPassword) {
    return request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  // --- Admin Dashboard ---
  async getDashboardData() {
    return request('/admin/dashboard');
  },

  // --- Admin About & Stats ---
  async getAbout() {
    return request('/admin/about');
  },

  async updateAbout(aboutData) {
    return request('/admin/about', {
      method: 'PUT',
      body: JSON.stringify(aboutData)
    });
  },

  // --- Admin Projects ---
  async getAdminProjects() {
    return request('/admin/projects');
  },

  async getAdminProject(id) {
    return request(`/admin/projects/${id}`);
  },

  async createProject(projectData) {
    return request('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  },

  async updateProject(id, projectData) {
    return request(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    });
  },

  async deleteProject(id) {
    return request(`/admin/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // --- Admin Services ---
  async getAdminServices() {
    return request('/admin/services');
  },

  async createService(serviceData) {
    return request('/admin/services', {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },

  async updateService(id, serviceData) {
    return request(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  },

  async deleteService(id) {
    return request(`/admin/services/${id}`, {
      method: 'DELETE'
    });
  },

  // --- Admin Skills ---
  async getAdminSkills() {
    return request('/admin/skills');
  },

  async createSkill(skillData) {
    return request('/admin/skills', {
      method: 'POST',
      body: JSON.stringify(skillData)
    });
  },

  async updateSkill(id, skillData) {
    return request(`/admin/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skillData)
    });
  },

  async deleteSkill(id) {
    return request(`/admin/skills/${id}`, {
      method: 'DELETE'
    });
  },

  // --- Admin Experience ---
  async getAdminExperiences() {
    return request('/admin/experiences');
  },

  async createExperience(expData) {
    return request('/admin/experiences', {
      method: 'POST',
      body: JSON.stringify(expData)
    });
  },

  async updateExperience(id, expData) {
    return request(`/admin/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expData)
    });
  },

  async deleteExperience(id) {
    return request(`/admin/experiences/${id}`, {
      method: 'DELETE'
    });
  },

  // --- Admin Testimonials ---
  async getAdminTestimonials() {
    return request('/admin/testimonials');
  },

  async createTestimonial(testimonialData) {
    return request('/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData)
    });
  },

  async updateTestimonial(id, testimonialData) {
    return request(`/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData)
    });
  },

  async deleteTestimonial(id) {
    return request(`/admin/testimonials/${id}`, {
      method: 'DELETE'
    });
  },

  // --- Admin Socials ---
  async getAdminSocials() {
    return request('/admin/socials');
  },

  async updateSocialLink(id, socialData) {
    return request(`/admin/socials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(socialData)
    });
  },

  // --- Admin Messages ---
  async getAdminMessages() {
    return request('/admin/messages');
  },

  async markMessageRead(id, isRead) {
    return request(`/admin/messages/${id}/read`, {
      method: 'PUT',
      body: JSON.stringify({ is_read: isRead ? 1 : 0 })
    });
  },

  async deleteMessage(id) {
    return request(`/admin/messages/${id}`, {
      method: 'DELETE'
    });
  },

  // --- Admin Settings ---
  async getAdminSettings() {
    return request('/admin/settings');
  },

  async updateSettings(settingsData) {
    return request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    });
  },

  // --- File Upload ---
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    return request('/upload', {
      method: 'POST',
      body: formData
    });
  }
};
