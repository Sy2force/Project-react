const express = require('express');
const { submitContact, getContactMessages, updateContactStatus, getContactStats } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', submitContact);

// GET /api/contact/messages - Get all contact messages (Admin)
router.get('/messages', getContactMessages);

// PATCH /api/contact/messages/:id - Update contact message status (Admin)
router.patch('/messages/:id', updateContactStatus);

// GET /api/contact/stats - Get contact statistics (Admin)
router.get('/stats', getContactStats);

module.exports = router;
