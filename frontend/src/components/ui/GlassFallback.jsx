import React from 'react'

const GlassFallback = ({ 
  height = "200px", 
  message = "Chargement...", 
  icon = null,
  className = "" 
}) => {
  return (
    <div className={`glass rounded-2xl p-6 flex items-center justify-center ${className}`} style={{ height }}>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        {icon && (
          <div className="text-blue-400 mb-2 flex justify-center">
            {icon}
          </div>
        )}
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  )
}

export { GlassFallback }
export default GlassFallback
