const twilio = require('twilio');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isConfigured = false;
    this.initializeClient();
  }

  initializeClient() {
    try {
      if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        console.log('⚠️ WhatsApp: Twilio credentials not configured');
        return;
      }

      this.client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      this.isConfigured = true;
      console.log('✅ WhatsApp Service: Configured successfully');
    } catch (error) {
      console.error('❌ WhatsApp Service Error:', error.message);
      this.isConfigured = false;
    }
  }

  async sendContactNotification(contactData) {
    if (!this.isConfigured) {
      throw new Error('WhatsApp service not configured');
    }

    const { name, email, phone, subject, message, projectType, budget } = contactData;
    const adminNumber = process.env.ADMIN_WHATSAPP_TO;

    if (!adminNumber) {
      throw new Error('Admin WhatsApp number not configured');
    }

    // Format message for WhatsApp
    const whatsappMessage = `
🚀 *Nouveau Contact Portfolio*

👤 *Contact:*
• Nom: ${name}
• Email: ${email}
${phone ? `• Téléphone: ${phone}` : ''}

💼 *Projet:*
• Sujet: ${subject}
${projectType ? `• Type: ${projectType}` : ''}
${budget ? `• Budget: ${budget}` : ''}

💬 *Message:*
${message}

---
📱 Envoyé depuis shayacoca.com
⏰ ${new Date().toLocaleString('fr-FR')}
    `.trim();

    try {
      const result = await this.client.messages.create({
        body: whatsappMessage,
        from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
        to: adminNumber
      });

      console.log('✅ WhatsApp: Contact notification sent successfully');
      console.log(`📱 Message SID: ${result.sid}`);

      return {
        success: true,
        messageSid: result.sid,
        status: result.status
      };

    } catch (error) {
      console.error('❌ WhatsApp Error:', error.message);
      throw new Error(`Failed to send WhatsApp: ${error.message}`);
    }
  }

  async sendCustomMessage(to, message, options = {}) {
    if (!this.isConfigured) {
      throw new Error('WhatsApp service not configured');
    }

    try {
      const result = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
        to: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`,
        ...options
      });

      console.log(`✅ WhatsApp sent to ${to}: ${result.sid}`);
      return { success: true, messageSid: result.sid };
    } catch (error) {
      console.error(`❌ WhatsApp Error (${to}):`, error.message);
      throw error;
    }
  }

  async sendProjectUpdate(clientNumber, projectName, status, nextSteps) {
    const message = `
🎯 *Mise à jour projet: ${projectName}*

📊 *Statut:* ${status}

📋 *Prochaines étapes:*
${nextSteps}

---
Shay Acoca - Créateur du Futur Digital
📱 shayacoca.com
    `.trim();

    return this.sendCustomMessage(clientNumber, message);
  }

  async verifyConnection() {
    if (!this.isConfigured) {
      return { success: false, error: 'WhatsApp service not configured' };
    }

    try {
      // Test with account info
      const account = await this.client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
      console.log('✅ WhatsApp: Twilio connection verified');
      return { 
        success: true, 
        accountSid: account.sid,
        status: account.status 
      };
    } catch (error) {
      console.error('❌ WhatsApp: Twilio verification failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  getStatus() {
    return {
      isConfigured: this.isConfigured,
      hasCredentials: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
      fromNumber: process.env.TWILIO_WHATSAPP_FROM,
      adminNumber: process.env.ADMIN_WHATSAPP_TO
    };
  }
}

// Export singleton instance
const whatsappService = new WhatsAppService();
module.exports = whatsappService;
