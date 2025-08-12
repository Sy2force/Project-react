/**
 * Enhanced Error Handling Utilities
 * Provides comprehensive error logging, reporting, and user feedback
 */

class ErrorHandler {
  constructor() {
    this.errorQueue = [];
    this.maxQueueSize = 50;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  /**
   * Log error with context and metadata
   */
  logError(error, context = {}) {
    const errorData = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      type: error.name,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: localStorage.getItem('userId') || 'anonymous',
      sessionId: this.getSessionId(),
      buildVersion: process.env.REACT_APP_VERSION || 'development'
    };

    // J'ajoute l'erreur à ma file d'attente
    this.addToQueue(errorData);

    // J'affiche l'erreur dans la console en mode dev
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Handler');
      console.error('Error:', error);
      console.table(errorData);
      console.groupEnd();
    }

    // Send to monitoring services
    this.sendToMonitoring(errorData);

    return errorData.id;
  }

  /**
   * Handle async errors with retry logic
   */
  async handleAsyncError(asyncFunction, context = {}, maxRetries = this.retryAttempts) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await asyncFunction();
      } catch (error) {
        lastError = error;
        
        const errorContext = {
          ...context,
          attempt,
          maxRetries,
          retryable: this.isRetryableError(error)
        };

        this.logError(error, errorContext);

        // Don't retry if error is not retryable or on last attempt
        if (!this.isRetryableError(error) || attempt === maxRetries) {
          throw error;
        }

        // Wait before retry
        await this.delay(this.retryDelay * attempt);
      }
    }

    throw lastError;
  }

  /**
   * Handle API errors with user-friendly messages
   */
  handleApiError(error, showToUser = true) {
    const userMessage = this.getUserFriendlyMessage(error);
    const errorId = this.logError(error, { type: 'api_error', userMessage });

    if (showToUser && window.toast) {
      window.toast.error(userMessage, {
        description: `ID d'erreur: ${errorId}`,
        duration: 5000
      });
    }

    return { errorId, userMessage };
  }

  /**
   * Generate unique error ID
   */
  generateErrorId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get or create session ID
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = this.generateErrorId();
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  /**
   * Add error to queue with size management
   */
  addToQueue(errorData) {
    this.errorQueue.push(errorData);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('errorQueue', JSON.stringify(this.errorQueue.slice(-10)));
    } catch (e) {
      // localStorage might be full, ignore
    }
  }

  /**
   * Send error to monitoring services
   */
  async sendToMonitoring(errorData) {
    const services = [
      () => this.sendToSentry(errorData),
      () => this.sendToAnalytics(errorData),
      () => this.sendToCustomEndpoint(errorData)
    ];

    // Send to all services in parallel, ignore failures
    await Promise.allSettled(services.map(service => service()));
  }

  /**
   * Send to Sentry
   */
  async sendToSentry(errorData) {
    if (window.Sentry) {
      window.Sentry.captureException(new Error(errorData.message), {
        tags: {
          errorId: errorData.id,
          component: errorData.context.component || 'unknown'
        },
        extra: errorData
      });
    }
  }

  /**
   * Send to Google Analytics
   */
  async sendToAnalytics(errorData) {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: errorData.message,
        fatal: false,
        error_id: errorData.id,
        custom_parameter_1: errorData.context.component || 'unknown'
      });
    }
  }

  /**
   * Send to custom error endpoint
   */
  async sendToCustomEndpoint(errorData) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      });
    } catch (e) {
      // Silently fail - don't create error loops
    }
  }

  /**
   * Check if error is retryable
   */
  isRetryableError(error) {
    const retryableTypes = [
      'NetworkError',
      'TimeoutError',
      'AbortError'
    ];

    const retryableStatusCodes = [408, 429, 500, 502, 503, 504];

    return (
      retryableTypes.includes(error.name) ||
      (error.status && retryableStatusCodes.includes(error.status)) ||
      error.message.includes('fetch') ||
      error.message.includes('network')
    );
  }

  /**
   * Get user-friendly error message
   */
  getUserFriendlyMessage(error) {
    const errorMap = {
      'NetworkError': 'Problème de connexion réseau. Vérifiez votre connexion internet.',
      'TimeoutError': 'La requête a pris trop de temps. Veuillez réessayer.',
      'ValidationError': 'Les données saisies ne sont pas valides.',
      'AuthenticationError': 'Vous devez vous connecter pour effectuer cette action.',
      'AuthorizationError': 'Vous n\'avez pas les permissions nécessaires.',
      'NotFoundError': 'La ressource demandée n\'a pas été trouvée.',
      'ServerError': 'Erreur du serveur. Nous travaillons à résoudre ce problème.'
    };

    // Check by error name
    if (errorMap[error.name]) {
      return errorMap[error.name];
    }

    // Check by status code
    if (error.status) {
      switch (error.status) {
        case 400: return 'Requête invalide. Vérifiez les données saisies.';
        case 401: return 'Authentification requise. Veuillez vous connecter.';
        case 403: return 'Accès interdit. Permissions insuffisantes.';
        case 404: return 'Page ou ressource introuvable.';
        case 408: return 'Délai d\'attente dépassé. Veuillez réessayer.';
        case 429: return 'Trop de requêtes. Veuillez patienter un moment.';
        case 500: return 'Erreur interne du serveur.';
        case 502: return 'Erreur de passerelle. Service temporairement indisponible.';
        case 503: return 'Service indisponible. Maintenance en cours.';
        default: return 'Une erreur inattendue s\'est produite.';
      }
    }

    // Default message
    return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  }

  /**
   * Utility delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;

    const recentErrors = this.errorQueue.filter(
      error => now - new Date(error.timestamp).getTime() < oneHour
    );

    const dailyErrors = this.errorQueue.filter(
      error => now - new Date(error.timestamp).getTime() < oneDay
    );

    return {
      total: this.errorQueue.length,
      lastHour: recentErrors.length,
      lastDay: dailyErrors.length,
      mostCommon: this.getMostCommonErrors(),
      byType: this.getErrorsByType()
    };
  }

  /**
   * Get most common errors
   */
  getMostCommonErrors() {
    const errorCounts = {};
    this.errorQueue.forEach(error => {
      errorCounts[error.message] = (errorCounts[error.message] || 0) + 1;
    });

    return Object.entries(errorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([message, count]) => ({ message, count }));
  }

  /**
   * Get errors by type
   */
  getErrorsByType() {
    const typeCounts = {};
    this.errorQueue.forEach(error => {
      typeCounts[error.type] = (typeCounts[error.type] || 0) + 1;
    });

    return typeCounts;
  }

  /**
   * Clear error queue
   */
  clearErrors() {
    this.errorQueue = [];
    localStorage.removeItem('errorQueue');
  }

  /**
   * Export errors for debugging
   */
  exportErrors() {
    const data = {
      errors: this.errorQueue,
      stats: this.getErrorStats(),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `errors-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler();

// Global error handlers
window.addEventListener('error', (event) => {
  errorHandler.logError(event.error, {
    type: 'global_error',
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

window.addEventListener('unhandledrejection', (event) => {
  errorHandler.logError(event.reason, {
    type: 'unhandled_promise_rejection'
  });
});

export default errorHandler;
