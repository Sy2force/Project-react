import helmet from 'helmet'

// Content Security Policy configuration
export const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'", // Needed for Vite in development
      "'unsafe-eval'", // Needed for development
      "https://fonts.googleapis.com",
      "https://cdn.jsdelivr.net"
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'", // Needed for styled-components and CSS-in-JS
      "https://fonts.googleapis.com"
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "data:"
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https:",
      "blob:"
    ],
    connectSrc: [
      "'self'",
      "http://localhost:3000", // Frontend dev server
      "http://localhost:5001", // Backend API
      "https://api.placeholder.com" // Placeholder images
    ],
    mediaSrc: ["'self'", "data:", "blob:"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'none'"],
    upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
  },
  reportOnly: process.env.NODE_ENV === 'development' // Report-only in development
}

// Security middleware configuration
export const securityMiddleware = helmet({
  contentSecurityPolicy: cspConfig,
  crossOriginEmbedderPolicy: false, // Disable for API compatibility
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'same-origin' }
})

// Additional security headers
export const additionalSecurityHeaders = (req, res, next) => {
  // Remove server information
  res.removeHeader('X-Powered-By')
  
  // Add custom security headers
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // API-specific headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  
  next()
}
