import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Globe, MessageCircle, Twitter, Linkedin, Github, Instagram, CheckCircle, User, Building, MessageSquare, Calendar } from 'lucide-react';
import { Button, Card, Input } from '../components/ui/index.js';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        projectType: '',
        budget: '',
        timeline: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@shayacoca.com',
      description: 'Send us an email anytime',
      href: 'mailto:hello@shayacoca.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      description: 'Come say hello at our HQ',
      href: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon-Fri 8:00-18:00',
      description: 'We respond within 24 hours',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const projectTypes = [
    'Web Development',
    'Mobile App',
    'UI/UX Design',
    'E-commerce',
    'SaaS Platform',
    'Consulting',
    'Other'
  ];

  const budgetRanges = [
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Let\'s discuss'
  ];

  const timelineOptions = [
    '1-2 months',
    '3-6 months',
    '6-12 months',
    '12+ months',
    'Flexible'
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get In <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">Touch</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Ready to bring your vision to life? Let's discuss your project and explore how we can help you achieve your goals.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                variant="glass" 
                className="p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => info.href !== '#' && window.open(info.href)}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                <p className="text-neon-cyan font-medium mb-1">{info.value}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card variant="glass" className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
              <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    icon={<User className="w-5 h-5" />}
                    variant="glass"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    icon={<Mail className="w-5 h-5" />}
                    variant="glass"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="company"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                    icon={<Building className="w-5 h-5" />}
                    variant="glass"
                  />
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    icon={<MessageSquare className="w-5 h-5" />}
                    variant="glass"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all"
                    >
                      <option value="">Select type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type} className="bg-gray-800">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map(budget => (
                        <option key={budget} value={budget} className="bg-gray-800">{budget}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map(timeline => (
                        <option key={timeline} value={timeline} className="bg-gray-800">{timeline}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </motion.div>

        {/* Map & Additional Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          {/* Interactive Map Placeholder */}
          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Our Location</h3>
            <div className="aspect-video bg-gradient-to-br from-neon-cyan/10 to-neon-blue/10 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
                <p className="text-white font-semibold">San Francisco, CA</p>
                <p className="text-gray-400 text-sm">Interactive map would be integrated here</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-neon-cyan" />
              <span>123 Innovation Street, San Francisco, CA 94105</span>
            </div>
          </Card>

          {/* FAQ Section */}
          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">How long does a typical project take?</h4>
                <p className="text-gray-400 text-sm">Project timelines vary based on complexity, but most projects range from 3-6 months from start to finish.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Do you work with international clients?</h4>
                <p className="text-gray-400 text-sm">Yes! We work with clients worldwide and have experience managing projects across different time zones.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">What's included in your services?</h4>
                <p className="text-gray-400 text-sm">We provide end-to-end solutions including strategy, design, development, testing, and ongoing support.</p>
              </div>
            </div>
          </Card>

          {/* Social Links */}
          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-lg flex items-center justify-center hover:from-neon-cyan/30 hover:to-neon-blue/30 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5 text-neon-cyan" />
                  </motion.a>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card variant="glass" className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your <span className="text-neon-cyan">Project</span>?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you have a detailed brief or just an idea, we're here to help you turn your vision into reality. 
            Let's schedule a consultation to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg">
              <Globe className="w-5 h-5 mr-2" />
              View Our Work
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactPage;
