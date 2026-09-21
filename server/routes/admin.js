const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// Protect all admin routes
router.use(requireAuth);

// --- DASHBOARD OVERVIEW ---
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await db.getDashboardStats();
    const messages = await db.getMessages();
    const projects = await db.getProjects({ includeUnpublished: true });

    res.json({
      success: true,
      data: {
        stats,
        recentMessages: messages.slice(0, 5),
        recentProjects: projects.slice(0, 5),
        admin: req.admin
      }
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to load dashboard metrics.' });
  }
});

// --- ABOUT & STATS ---
router.get('/about', async (req, res) => {
  try {
    const about = await db.getAbout();
    res.json({ success: true, data: about });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch about data.' });
  }
});

router.put('/about', async (req, res) => {
  try {
    const updated = await db.updateAbout(req.body);
    res.json({ success: true, message: 'About profile updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update about data.' });
  }
});

// --- PROJECTS CRUD ---
router.get('/projects', async (req, res) => {
  try {
    const projects = await db.getProjects({ includeUnpublished: true });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load projects.' });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await db.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch project.' });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Project title is required.' });
    }
    const newProject = await db.createProject(req.body);
    res.status(201).json({ success: true, message: 'Project created successfully.', data: newProject });
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const updated = await db.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Project not found.' });
    res.json({ success: true, message: 'Project updated successfully.', data: updated });
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await db.deleteProject(req.params.id);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
});

// --- SERVICES CRUD ---
router.get('/services', async (req, res) => {
  try {
    const services = await db.getServices();
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch services.' });
  }
});

router.post('/services', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }
    const created = await db.createService(req.body);
    res.status(201).json({ success: true, message: 'Service created successfully.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create service.' });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const updated = await db.updateService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, message: 'Service updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update service.' });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    await db.deleteService(req.params.id);
    res.json({ success: true, message: 'Service deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete service.' });
  }
});

// --- SKILLS CRUD ---
router.get('/skills', async (req, res) => {
  try {
    const skills = await db.getSkills();
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch skills.' });
  }
});

router.post('/skills', async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Skill name and category are required.' });
    }
    const created = await db.createSkill(req.body);
    res.status(201).json({ success: true, message: 'Skill created successfully.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create skill.' });
  }
});

router.put('/skills/:id', async (req, res) => {
  try {
    const updated = await db.updateSkill(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Skill not found.' });
    res.json({ success: true, message: 'Skill updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update skill.' });
  }
});

router.delete('/skills/:id', async (req, res) => {
  try {
    await db.deleteSkill(req.params.id);
    res.json({ success: true, message: 'Skill deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete skill.' });
  }
});

// --- EXPERIENCES CRUD ---
router.get('/experiences', async (req, res) => {
  try {
    const list = await db.getExperiences();
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch experiences.' });
  }
});

router.post('/experiences', async (req, res) => {
  try {
    const { company, position, period } = req.body;
    if (!company || !position || !period) {
      return res.status(400).json({ success: false, message: 'Company, position, and period are required.' });
    }
    const created = await db.createExperience(req.body);
    res.status(201).json({ success: true, message: 'Experience added.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create experience.' });
  }
});

router.put('/experiences/:id', async (req, res) => {
  try {
    const updated = await db.updateExperience(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Experience not found.' });
    res.json({ success: true, message: 'Experience updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update experience.' });
  }
});

router.delete('/experiences/:id', async (req, res) => {
  try {
    await db.deleteExperience(req.params.id);
    res.json({ success: true, message: 'Experience deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete experience.' });
  }
});

// --- TESTIMONIALS CRUD ---
router.get('/testimonials', async (req, res) => {
  try {
    const list = await db.getTestimonials({ activeOnly: false });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials.' });
  }
});

router.post('/testimonials', async (req, res) => {
  try {
    const { client_name, quote } = req.body;
    if (!client_name || !quote) {
      return res.status(400).json({ success: false, message: 'Client name and testimonial quote are required.' });
    }
    const created = await db.createTestimonial(req.body);
    res.status(201).json({ success: true, message: 'Testimonial added.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create testimonial.' });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  try {
    const updated = await db.updateTestimonial(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    res.json({ success: true, message: 'Testimonial updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update testimonial.' });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    await db.deleteTestimonial(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial.' });
  }
});

// --- SOCIAL LINKS ---
router.get('/socials', async (req, res) => {
  try {
    const socials = await db.getSocialLinks();
    res.json({ success: true, data: socials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load social links.' });
  }
});

router.put('/socials/:id', async (req, res) => {
  try {
    const updated = await db.updateSocialLink(req.params.id, req.body);
    res.json({ success: true, message: 'Social link updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update social link.' });
  }
});

router.post('/socials/batch', async (req, res) => {
  try {
    const updated = await db.updateAllSocials(req.body);
    res.json({ success: true, message: 'All social links updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update social links.' });
  }
});

// --- CONTACT MESSAGES INBOX ---
router.get('/messages', async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load messages.' });
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    const isRead = req.body.is_read !== undefined ? req.body.is_read : 1;
    const updated = await db.markMessageRead(req.params.id, isRead);
    res.json({ success: true, message: 'Message status updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update message.' });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    await db.deleteMessage(req.params.id);
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
});

// --- SITE SETTINGS ---
router.get('/settings', async (req, res) => {
  try {
    const settings = await db.getSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load settings.' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const updated = await db.updateSettings(req.body);
    res.json({ success: true, message: 'Site settings updated.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update settings.' });
  }
});

module.exports = router;
