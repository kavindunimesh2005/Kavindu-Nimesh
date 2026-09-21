const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// GET /api/public/portfolio - Single aggregated payload for instant first-paint
router.get('/portfolio', async (req, res) => {
  try {
    const [about, projects, services, skills, experiences, testimonials, socials, settings] = await Promise.all([
      db.getAbout(),
      db.getProjects({ includeUnpublished: false }),
      db.getServices(),
      db.getSkills(),
      db.getExperiences(),
      db.getTestimonials({ activeOnly: true }),
      db.getSocialLinks(),
      db.getSettings()
    ]);

    res.json({
      success: true,
      data: {
        about,
        projects,
        services: services.filter(s => s.is_active),
        skills: skills.filter(s => s.is_active),
        experiences,
        testimonials,
        socials: socials.filter(s => s.is_active),
        settings
      }
    });
  } catch (err) {
    console.error('Error fetching portfolio data:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve portfolio data.' });
  }
});

// GET /api/public/projects/:slug - Case study details
router.get('/projects/:slug', async (req, res) => {
  try {
    const project = await db.getProjectBySlug(req.params.slug);
    if (!project || !project.is_published) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    // Also fetch next/previous projects for navigation
    const all = await db.getProjects({ includeUnpublished: false });
    const currentIndex = all.findIndex(p => p.slug === req.params.slug);
    const prevProject = currentIndex > 0 ? { slug: all[currentIndex - 1].slug, title: all[currentIndex - 1].title } : null;
    const nextProject = currentIndex < all.length - 1 ? { slug: all[currentIndex + 1].slug, title: all[currentIndex + 1].title } : null;

    res.json({
      success: true,
      data: {
        project,
        prevProject,
        nextProject
      }
    });
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch project.' });
  }
});

// POST /api/public/contact - Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, project_type, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const newMessage = await db.createMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      project_type: project_type || 'General Inquiry',
      budget: budget || 'Flexible',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Kavindu will get back to you shortly.',
      data: newMessage
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit message. Please try again later.' });
  }
});

module.exports = router;
