import { useState, useEffect, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

const NotificationItem = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto remove after duration
    if (notification.duration > 0) {
      const timer = setTimeout(() => handleRemove(), notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(notification.id), 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColors = () => {
    switch (notification.type) {
      case 'success': return 'border-green-500/30 bg-green-900/20';
      case 'error': return 'border-red-500/30 bg-red-900/20';
      case 'warning': return 'border-yellow-500/30 bg-yellow-900/20';
      case 'info': return 'border-blue-500/30 bg-blue-900/20';
      default: return 'border-blue-500/30 bg-blue-900/20';
    }
  };

  return (
    <div
      style={{
        transform: isRemoving 
          ? 'translateX(100%) scale(0.8)' 
          : isVisible 
            ? 'translateX(0) scale(1)' 
            : 'translateX(100%) scale(0.8)',
        opacity: isRemoving ? 0 : isVisible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        marginBottom: 12
      }}
      className={`
        relative p-4 rounded-xl border backdrop-blur-lg
        ${getColors()}
        shadow-lg max-w-sm w-full
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-white font-medium text-sm mb-1">
            {notification.title}
          </div>
          {notification.description && (
            <div className="text-white/70 text-xs leading-relaxed">
              {notification.description}
            </div>
          )}
        </div>
        
        <button
          onClick={handleRemove}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Fermer la notification"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Progress bar for timed notifications */}
      {notification.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-white/30 rounded-b-xl"
            style={{
              animation: `shrink ${notification.duration}ms linear`,
              transformOrigin: 'left'
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Convenience methods
  const success = (title, options = {}) => 
    addNotification({ ...options, title, type: 'success' });

  const error = (title, options = {}) => 
    addNotification({ ...options, title, type: 'error', duration: 7000 });

  const warning = (title, options = {}) => 
    addNotification({ ...options, title, type: 'warning' });

  const info = (title, options = {}) => 
    addNotification({ ...options, title, type: 'info' });

  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      
      {/* Notification Container */}
      <div
        className="fixed top-4 right-4 z-50 pointer-events-none"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className="flex flex-col-reverse pointer-events-auto">
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      </div>
    </NotificationContext.Provider>
  );
};

// Global toast function for easy access
if (typeof window !== 'undefined') {
  window.toast = {
    success: (title, options) => {
      const event = new CustomEvent('toast', {
        detail: { type: 'success', title, ...options }
      });
      window.dispatchEvent(event);
    },
    error: (title, options) => {
      const event = new CustomEvent('toast', {
        detail: { type: 'error', title, ...options }
      });
      window.dispatchEvent(event);
    },
    warning: (title, options) => {
      const event = new CustomEvent('toast', {
        detail: { type: 'warning', title, ...options }
      });
      window.dispatchEvent(event);
    },
    info: (title, options) => {
      const event = new CustomEvent('toast', {
        detail: { type: 'info', title, ...options }
      });
      window.dispatchEvent(event);
    }
  };
}
