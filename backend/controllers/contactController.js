const ContactMessage = require('../models/ContactMessage');
const emailService = require('../services/emailService');
const whatsappService = require('../services/whatsappService');

/**
 * Submit contact form
 * POST /api/contact
 */
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, projectType, budget, timeline, source } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis'
      });
    }

    // Create contact message
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
      projectType,
      budget,
      timeline,
      source: source || 'website',
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown'
    };

    const contactMessage = new ContactMessage(contactData);
    await contactMessage.save();

    console.log(`📬 New contact message from ${name} (${email})`);

    // Send notifications (parallel)
    const notifications = [];

    try {
      // Email notification
      const emailResult = await emailService.sendContactNotification(contactData);
      notifications.push({ type: 'email', success: true, id: emailResult.adminMessageId });
      contactMessage.emailSent = true;
    } catch (emailError) {
      console.error('📧 Email notification failed:', emailError.message);
      notifications.push({ type: 'email', success: false, error: emailError.message });
    }

    try {
      // WhatsApp notification
      const whatsappResult = await whatsappService.sendContactNotification(contactData);
      notifications.push({ type: 'whatsapp', success: true, id: whatsappResult.messageSid });
      contactMessage.whatsappSent = true;
    } catch (whatsappError) {
      console.error('📱 WhatsApp notification failed:', whatsappError.message);
      notifications.push({ type: 'whatsapp', success: false, error: whatsappError.message });
    }

    // Update contact message with notification status
    await contactMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès ! Je vous recontacterai sous 24-48h.',
      contactId: contactMessage._id,
      notifications
    });

  } catch (error) {
    console.error('💥 Contact submission error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    });
  }
};

/**
 * Get contact messages (Admin only)
 * GET /api/contact/messages
 */
const getContactMessages = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, priority } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      select: '-userAgent -ipAddress' // Hide sensitive data
    };

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const total = await ContactMessage.countDocuments(query);
    const stats = await ContactMessage.getStats();

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          page: options.page,
          limit: options.limit,
          total,
          pages: Math.ceil(total / options.limit)
        },
        stats
      }
    });

  } catch (error) {
    console.error('💥 Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des messages'
    });
  }
};

/**
 * Update contact message status (Admin only)
 * PATCH /api/contact/messages/:id
 */
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;

    if (status === 'responded') {
      updateData.responseDate = new Date();
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé'
      });
    }

    console.log(`📝 Contact message ${id} updated: ${status}`);

    res.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      data: message
    });

  } catch (error) {
    console.error('💥 Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    });
  }
};

/**
 * Get contact statistics (Admin only)
 * GET /api/contact/stats
 */
const getContactStats = async (req, res) => {
  try {
    const stats = await ContactMessage.getStats();
    
    // Additional analytics
    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt status');

    const topProjectTypes = await ContactMessage.aggregate([
      { $match: { projectType: { $exists: true, $ne: null } } },
      { $group: { _id: '$projectType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        ...stats,
        recentMessages,
        topProjectTypes
      }
    });

  } catch (error) {
    console.error('💥 Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
};

module.exports = {
  submitContact,
  getContactMessages,
  updateContactStatus,
  getContactStats
};
