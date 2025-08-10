const express = require('express');
const dbConnection = require('../config/database');
const router = express.Router();

/**
 * Health Check Endpoint
 * GET /api/health
 * Returns system status and database connectivity
 */
router.get('/', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Check database status
    const dbStatus = dbConnection.getStatus();
    
    // System information
    const systemInfo = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024)
      },
      cpu: process.cpuUsage(),
      version: process.version,
      platform: process.platform,
      arch: process.arch
    };

    // Environment info (safe)
    const environment = {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasMongoUri: !!process.env.MONGODB_URI,
      corsOrigins: process.env.CORS_ORIGINS?.split(',').length || 0
    };

    const responseTime = Date.now() - startTime;

    // Determine overall health status
    const isHealthy = dbStatus.isConnected && responseTime < 1000;

    const healthData = {
      status: isHealthy ? 'healthy' : 'degraded',
      service: 'Shay Acoca Portfolio API',
      version: '1.0.0',
      responseTime: `${responseTime}ms`,
      database: {
        status: dbStatus.isConnected ? 'connected' : 'disconnected',
        readyState: dbStatus.readyState,
        host: dbStatus.host,
        port: dbStatus.port,
        name: dbStatus.name
      },
      system: systemInfo,
      environment,
      checks: {
        database: dbStatus.isConnected,
        memory: systemInfo.memory.used < 500, // Less than 500MB
        responseTime: responseTime < 1000 // Less than 1 second
      }
    };

    // Set appropriate status code
    const statusCode = isHealthy ? 200 : 503;
    
    res.status(statusCode).json(healthData);

    // Log health check
    console.log(`🏥 Health Check: ${isHealthy ? '✅ Healthy' : '⚠️ Degraded'} (${responseTime}ms)`);

  } catch (error) {
    console.error('💥 Health Check Error:', error.message);
    
    res.status(503).json({
      status: 'error',
      service: 'Shay Acoca Portfolio API',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Detailed Health Check (Admin only)
 * GET /api/health/detailed
 */
router.get('/detailed', async (req, res) => {
  try {
    // This would normally require admin authentication
    // For now, we'll return basic info
    
    const detailedInfo = {
      ...await getBasicHealth(),
      routes: {
        auth: '/api/auth',
        users: '/api/users', 
        contact: '/api/contact',
        health: '/api/health'
      },
      middleware: {
        helmet: true,
        cors: true,
        compression: true,
        rateLimit: true
      },
      features: {
        authentication: true,
        fileUpload: true,
        emailService: !!process.env.SMTP_USER,
        whatsappService: !!process.env.TWILIO_ACCOUNT_SID
      }
    };

    res.json(detailedInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getBasicHealth() {
  const dbStatus = dbConnection.getStatus();
  return {
    status: dbStatus.isConnected ? 'healthy' : 'degraded',
    database: dbStatus,
    timestamp: new Date().toISOString()
  };
}

module.exports = router;
