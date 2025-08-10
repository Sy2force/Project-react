import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComplete from '../components/NavbarComplete'
import Footer from '../components/Footer'

const AppLayoutComplete = ({ children }) => {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Navbar complet et fonctionnel */}
      <NavbarComplete />
      
      {/* Contenu principal avec padding pour le navbar fixe */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children || <Outlet />}
        </div>
      </main>
      
      {/* Footer intact - ne pas modifier */}
      <Footer />
    </div>
  )
}

export default AppLayoutComplete
