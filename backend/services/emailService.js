const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('⚠️ Email: SMTP credentials not configured');
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      this.isConfigured = true;
      console.log('✅ Email Service: Configured successfully');
    } catch (error) {
      console.error('❌ Email Service Error:', error.message);
      this.isConfigured = false;
    }
  }

  async sendContactNotification(contactData) {
    if (!this.isConfigured) {
      throw new Error('Email service not configured');
    }

    const { name, email, phone, subject, message, projectType, budget, timeline } = contactData;

    // Email to admin
    const adminEmailOptions = {
      from: process.env.MAIL_FROM || `"Shay Acoca Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `🚀 Nouveau contact: ${subject}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px;">
          <div style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 8px; backdrop-filter: blur(10px);">
            <h1 style="color: #1a202c; margin-bottom: 20px; font-size: 24px;">📬 Nouveau message de contact</h1>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #2d3748; margin-bottom: 15px; font-size: 18px;">👤 Informations du contact</h2>
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
              ${phone ? `<p><strong>Téléphone:</strong> <a href="tel:${phone}" style="color: #667eea;">${phone}</a></p>` : ''}
              <p><strong>Sujet:</strong> ${subject}</p>
            </div>

            <div style="background: #edf2f7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #2d3748; margin-bottom: 15px; font-size: 18px;">💼 Détails du projet</h2>
              ${projectType ? `<p><strong>Type de projet:</strong> ${projectType}</p>` : ''}
              ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
              ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            </div>

            <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #48bb78;">
              <h2 style="color: #2d3748; margin-bottom: 15px; font-size: 18px;">💬 Message</h2>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Répondre par email</a>
            </div>
          </div>
        </div>
      `
    };

    // Auto-reply to client
    const clientEmailOptions = {
      from: process.env.MAIL_FROM || `"Shay Acoca" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Merci pour votre message, ${name} !`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px;">
          <div style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 8px; backdrop-filter: blur(10px);">
            <h1 style="color: #1a202c; margin-bottom: 20px; font-size: 24px;">🙏 Merci ${name} !</h1>
            
            <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
              J'ai bien reçu votre message concernant "<strong>${subject}</strong>" et je vous remercie pour votre intérêt.
            </p>

            <div style="background: #e6fffa; padding: 20px; border-radius: 8px; border-left: 4px solid #38b2ac; margin-bottom: 20px;">
              <h2 style="color: #2d3748; margin-bottom: 10px; font-size: 16px;">⏰ Prochaines étapes</h2>
              <ul style="color: #4a5568; margin: 0; padding-left: 20px;">
                <li>Je reviendrai vers vous sous <strong>24-48h</strong></li>
                <li>Nous discuterons de votre projet en détail</li>
                <li>Je vous proposerai une solution adaptée</li>
              </ul>
            </div>

            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #2d3748; margin-bottom: 10px; font-size: 16px;">📱 En attendant</h2>
              <p style="color: #4a5568; margin-bottom: 10px;">Vous pouvez également me contacter directement :</p>
              <p style="margin: 5px 0;"><strong>WhatsApp:</strong> <a href="https://wa.me/972XXXXXXXX" style="color: #667eea;">+972 XX XXX XXXX</a></p>
              <p style="margin: 5px 0;"><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/shayacoca" style="color: #667eea;">linkedin.com/in/shayacoca</a></p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #718096; font-size: 14px;">
                Shay Acoca - Créateur du Futur Digital<br>
                <a href="https://shayacoca.com" style="color: #667eea;">shayacoca.com</a>
              </p>
            </div>
          </div>
        </div>
      `
    };

    try {
      // Send both emails
      const [adminResult, clientResult] = await Promise.all([
        this.transporter.sendMail(adminEmailOptions),
        this.transporter.sendMail(clientEmailOptions)
      ]);

      console.log('✅ Email: Contact notification sent successfully');
      console.log(`📧 Admin email ID: ${adminResult.messageId}`);
      console.log(`📧 Client email ID: ${clientResult.messageId}`);

      return {
        success: true,
        adminMessageId: adminResult.messageId,
        clientMessageId: clientResult.messageId
      };

    } catch (error) {
      console.error('❌ Email Error:', error.message);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendCustomEmail(to, subject, htmlContent, options = {}) {
    if (!this.isConfigured) {
      throw new Error('Email service not configured');
    }

    const emailOptions = {
      from: process.env.MAIL_FROM || `"Shay Acoca" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
      ...options
    };

    try {
      const result = await this.transporter.sendMail(emailOptions);
      console.log(`✅ Email sent to ${to}: ${result.messageId}`);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error(`❌ Email Error (${to}):`, error.message);
      throw error;
    }
  }

  async verifyConnection() {
    if (!this.isConfigured) {
      return { success: false, error: 'Email service not configured' };
    }

    try {
      await this.transporter.verify();
      console.log('✅ Email: SMTP connection verified');
      return { success: true };
    } catch (error) {
      console.error('❌ Email: SMTP verification failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const emailService = new EmailService();
module.exports = emailService;
