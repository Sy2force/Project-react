import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * AppLayout - Layout global unifié avec container 1200px
 * Applique le style footer (dark gradient, glass effects) sur toute l'application
 */
const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-footer-dark">
      {/* Navbar unifiée */}
      <Navbar />
      
      {/* Contenu principal avec container 1200px */}
      <main className="relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {children || <Outlet />}
        </div>
      </main>
      
      {/* Footer unifié */}
      <Footer />
    </div>
  );
};

export default AppLayout;
