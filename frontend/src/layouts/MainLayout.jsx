import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import NavbarAdvanced from '../components/NavbarAdvanced';

const MainLayout = () => {
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#ffffff',
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.3})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s infinite linear`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          />
        ))}
      </div>

      {/* Advanced Navigation */}
      <NavbarAdvanced />

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 1,
        minHeight: 'calc(100vh - 80px)'
      }}>
        <Outlet />
      </main>

      {/* Modern Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
            © 2024 Shay Acoca - Créateur du Futur Digital
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>À propos</Link>
            <Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Contact</Link>
            <Link to="/projects" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Projets</Link>
            <Link to="/blog" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
