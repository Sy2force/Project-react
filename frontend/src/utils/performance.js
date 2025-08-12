import React, { lazy } from 'react';

// Performance monitoring utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoads: [],
      apiCalls: [],
      componentRenders: [],
      userInteractions: [],
      errors: []
    };
    this.observers = [];
    this.startTime = performance.now();
  }

  // Record page load metrics
  recordPageLoad(pageName, loadTime) {
    this.metrics.pageLoads.push({
      page: pageName,
      loadTime,
      timestamp: Date.now(),
      url: window.location.href
    });
  }

  // Record API call metrics
  recordApiCall(endpoint, duration, status) {
    this.metrics.apiCalls.push({
      endpoint,
      duration,
      status,
      timestamp: Date.now()
    });
  }

  // Record component render metrics
  recordComponentRender(componentName, renderTime) {
    this.metrics.componentRenders.push({
      component: componentName,
      renderTime,
      timestamp: Date.now()
    });
  }

  // Record user interactions
  recordUserInteraction(action, element, duration = 0) {
    this.metrics.userInteractions.push({
      action,
      element,
      duration,
      timestamp: Date.now()
    });
  }

  // Record errors
  recordError(error, context) {
    this.metrics.errors.push({
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now()
    });
  }

  // Get performance summary
  getPerformanceSummary() {
    const now = performance.now();
    const totalTime = now - this.startTime;

    return {
      totalTime,
      pageLoads: this.metrics.pageLoads.length,
      apiCalls: this.metrics.apiCalls.length,
      componentRenders: this.metrics.componentRenders.length,
      userInteractions: this.metrics.userInteractions.length,
      errors: this.metrics.errors.length,
      averagePageLoad: this.getAveragePageLoad(),
      averageApiCall: this.getAverageApiCall()
    };
  }

  // Calculate average page load time
  getAveragePageLoad() {
    if (this.metrics.pageLoads.length === 0) return 0;
    const total = this.metrics.pageLoads.reduce((sum, load) => sum + load.loadTime, 0);
    return total / this.metrics.pageLoads.length;
  }

  // Calculate average API call time
  getAverageApiCall() {
    if (this.metrics.apiCalls.length === 0) return 0;
    const total = this.metrics.apiCalls.reduce((sum, call) => sum + call.duration, 0);
    return total / this.metrics.apiCalls.length;
  }

  // Clear metrics
  clearMetrics() {
    this.metrics = {
      pageLoads: [],
      apiCalls: [],
      componentRenders: [],
      userInteractions: [],
      errors: []
    };
  }
}

// Code splitting utilities
export class CodeSplittingManager {
  constructor() {
    this.loadedComponents = new Set();
    this.preloadQueue = [];
  }

  // Create lazy component with simple fallback
  createLazyComponent(importFunction, fallback = null) {
    const LazyComponent = lazy(() =>
      importFunction().catch(error => {
        console.error('Failed to load component:', error);
        return { 
          default: () => fallback || React.createElement('div', 
            { className: "p-4 text-center text-red-500" },
            'Erreur de chargement du composant'
          )
        };
      })
    );

    return LazyComponent;
  }

  // Preload component
  async preloadComponent(importFunction, componentName) {
    if (this.loadedComponents.has(componentName)) {
      return;
    }

    try {
      await importFunction();
      this.loadedComponents.add(componentName);
    } catch (error) {
      console.error(`Failed to preload component ${componentName}:`, error);
    }
  }

  // Preload multiple components
  async preloadComponents(components) {
    const promises = components.map(({ importFunction, name }) =>
      this.preloadComponent(importFunction, name)
    );
    
    await Promise.allSettled(promises);
  }
}

// Global instances
export const performanceMonitor = new PerformanceMonitor();
export const codeSplittingManager = new CodeSplittingManager();

// Performance hooks
export const usePerformanceMonitor = () => {
  const recordPageLoad = (pageName, loadTime) => {
    performanceMonitor.recordPageLoad(pageName, loadTime);
  };

  const recordApiCall = (endpoint, duration, status) => {
    performanceMonitor.recordApiCall(endpoint, duration, status);
  };

  const recordUserInteraction = (action, element, duration) => {
    performanceMonitor.recordUserInteraction(action, element, duration);
  };

  const getMetrics = () => {
    return performanceMonitor.getPerformanceSummary();
  };

  return {
    recordPageLoad,
    recordApiCall,
    recordUserInteraction,
    getMetrics
  };
};

// Cache management
export class CacheManager {
  constructor(maxSize = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.accessTimes = new Map();
  }

  set(key, value, ttl = 300000) { // 5 minutes default TTL
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
    this.accessTimes.set(key, Date.now());
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      this.accessTimes.delete(key);
      return null;
    }

    this.accessTimes.set(key, Date.now());
    return item.value;
  }

  has(key) {
    return this.cache.has(key) && Date.now() <= this.cache.get(key).expiry;
  }

  delete(key) {
    this.cache.delete(key);
    this.accessTimes.delete(key);
  }

  clear() {
    this.cache.clear();
    this.accessTimes.clear();
  }

  evictLRU() {
    let oldestKey = null;
    let oldestTime = Date.now();

    for (const [key, time] of this.accessTimes) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  size() {
    return this.cache.size;
  }
}

// Global cache instance
export const globalCache = new CacheManager();

// Export default performance monitor
export default performanceMonitor;
