const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { requireAuth } = require('../middleware/auth');

// POST /api/upload - Single image upload (protected by admin auth)
router.post('/', requireAuth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'Image uploaded successfully.',
      data: {
        filename: req.file.filename,
        path: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });
});

// POST /api/upload/multiple - Multiple images upload
router.post('/multiple', requireAuth, (req, res) => {
  upload.array('images', 8)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded.' });
    }

    const files = req.files.map(f => `/uploads/${f.filename}`);
    res.json({
      success: true,
      message: `${req.files.length} images uploaded successfully.`,
      data: files
    });
  });
});

module.exports = router;
