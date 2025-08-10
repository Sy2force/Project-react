// Utilitaires de performance pour le portfolio Shay Acoca
import { ENV_CONFIG } from '../config/env'

// Debounce function
export const debounce = (func, delay = ENV_CONFIG.PERFORMANCE_CONFIG.DEBOUNCE_DELAY) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// Throttle function
export const throttle = (func, delay = ENV_CONFIG.PERFORMANCE_CONFIG.THROTTLE_DELAY) => {
  let lastCall = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      return func.apply(null, args)
    }
  }
}

// Lazy loading avec Intersection Observer
export const createLazyLoader = (options = {}) => {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    onIntersect = () => {},
  } = options

  if (!('IntersectionObserver' in window)) {
    // Fallback pour les navigateurs non supportés
    return {
      observe: (element) => onIntersect(element),
      unobserve: () => {},
      disconnect: () => {},
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersect(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, { rootMargin, threshold })

  return observer
}

// Optimisation des images
export const optimizeImage = (src, options = {}) => {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
  } = options

  // Si c'est une URL externe, retourner telle quelle
  if (src.startsWith('http')) {
    return src
  }

  // Pour les images locales, on peut ajouter des paramètres d'optimisation
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
    f: format,
  })

  return `${src}?${params.toString()}`
}

// Préchargement des ressources critiques
export const preloadResource = (href, as = 'script', crossorigin = false) => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (crossorigin) link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

// Préchargement des images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Mesure des performances
export const measurePerformance = (name, fn) => {
  if (!ENV_CONFIG.DEV_CONFIG.SHOW_PERFORMANCE_MONITOR) {
    return fn()
  }

  const start = performance.now()
  const result = fn()
  const end = performance.now()
  
  console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`)
  
  return result
}

// Mesure des performances async
export const measurePerformanceAsync = async (name, fn) => {
  if (!ENV_CONFIG.DEV_CONFIG.SHOW_PERFORMANCE_MONITOR) {
    return await fn()
  }

  const start = performance.now()
  const result = await fn()
  const end = performance.now()
  
  console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`)
  
  return result
}

// Monitoring des Web Vitals
export const monitorWebVitals = () => {
  if (typeof window === 'undefined' || !ENV_CONFIG.ENABLE_ANALYTICS) {
    return
  }

  // First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`)
      }
    })
  })
  
  try {
    observer.observe({ entryTypes: ['paint'] })
  } catch (e) {
    // Navigateur non supporté
  }

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log(`🖼️ LCP: ${lastEntry.startTime.toFixed(2)}ms`)
  })
  
  try {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
  } catch (e) {
    // Navigateur non supporté
  }

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const fid = entry.processingStart - entry.startTime
      console.log(`⚡ FID: ${fid.toFixed(2)}ms`)
    })
  })
  
  try {
    fidObserver.observe({ entryTypes: ['first-input'] })
  } catch (e) {
    // Navigateur non supporté
  }
}

// Optimisation du rendu React
export const shouldComponentUpdate = (prevProps, nextProps, keys = []) => {
  if (keys.length === 0) {
    return JSON.stringify(prevProps) !== JSON.stringify(nextProps)
  }
  
  return keys.some(key => prevProps[key] !== nextProps[key])
}

// Memoization simple
const memoCache = new Map()

export const memoize = (fn, keyGenerator = (...args) => JSON.stringify(args)) => {
  return (...args) => {
    const key = keyGenerator(...args)
    
    if (memoCache.has(key)) {
      return memoCache.get(key)
    }
    
    const result = fn(...args)
    memoCache.set(key, result)
    
    // Nettoyer le cache si trop volumineux
    if (memoCache.size > 100) {
      const firstKey = memoCache.keys().next().value
      memoCache.delete(firstKey)
    }
    
    return result
  }
}

// Chunking pour les gros tableaux
export const chunkArray = (array, chunkSize = 10) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

// Traitement par batch pour éviter de bloquer l'UI
export const processBatch = async (items, processor, batchSize = 10, delay = 10) => {
  const chunks = chunkArray(items, batchSize)
  const results = []
  
  for (const chunk of chunks) {
    const chunkResults = await Promise.all(chunk.map(processor))
    results.push(...chunkResults)
    
    // Petite pause pour ne pas bloquer l'UI
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  return results
}

// Optimisation des scroll listeners
export const createOptimizedScrollListener = (callback, options = {}) => {
  const {
    throttleDelay = 16, // ~60fps
    passive = true,
  } = options

  const throttledCallback = throttle(callback, throttleDelay)
  
  const addListener = () => {
    window.addEventListener('scroll', throttledCallback, { passive })
  }
  
  const removeListener = () => {
    window.removeEventListener('scroll', throttledCallback)
  }
  
  return { addListener, removeListener }
}

// Optimisation des resize listeners
export const createOptimizedResizeListener = (callback, delay = 250) => {
  const debouncedCallback = debounce(callback, delay)
  
  const addListener = () => {
    window.addEventListener('resize', debouncedCallback, { passive: true })
  }
  
  const removeListener = () => {
    window.removeEventListener('resize', debouncedCallback)
  }
  
  return { addListener, removeListener }
}

// Nettoyage des event listeners
export const createEventListenerCleanup = () => {
  const listeners = []
  
  const add = (element, event, handler, options) => {
    element.addEventListener(event, handler, options)
    listeners.push({ element, event, handler, options })
  }
  
  const cleanup = () => {
    listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler)
    })
    listeners.length = 0
  }
  
  return { add, cleanup }
}

// Monitoring de la mémoire (dev only)
export const monitorMemory = () => {
  if (!ENV_CONFIG.DEV_CONFIG.SHOW_PERFORMANCE_MONITOR || !performance.memory) {
    return
  }
  
  const logMemory = () => {
    const memory = performance.memory
    console.log(`🧠 Memory: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB / ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`)
  }
  
  // Log initial
  logMemory()
  
  // Log toutes les 30 secondes
  const interval = setInterval(logMemory, 30000)
  
  return () => clearInterval(interval)
}

export default {
  debounce,
  throttle,
  createLazyLoader,
  optimizeImage,
  preloadResource,
  preloadImage,
  measurePerformance,
  measurePerformanceAsync,
  monitorWebVitals,
  shouldComponentUpdate,
  memoize,
  chunkArray,
  processBatch,
  createOptimizedScrollListener,
  createOptimizedResizeListener,
  createEventListenerCleanup,
  monitorMemory,
}
