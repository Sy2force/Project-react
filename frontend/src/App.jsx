import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import GlassFallback from './components/ui/GlassFallback'

// Nouvelles pages modernes Glass Kit
const IntroPageModern = React.lazy(() => import('./pages/IntroPageModern'))
const AuthPageModern = React.lazy(() => import('./pages/AuthPageModern'))
const HomePageGlassKit = React.lazy(() => import('./pages/HomePageGlassKit'))
const DashboardModern = React.lazy(() => import('./pages/DashboardModern'))
const GlassKitExamples = React.lazy(() => import('./components/glass/GlassKitExamples'))

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Suspense fallback={<GlassFallback />}>
          <Routes>
            {/* Page d'introduction moderne (point d'entrée) */}
            <Route path="/" element={<IntroPageModern />} />
            
            {/* Authentification moderne */}
            <Route path="/auth" element={<AuthPageModern />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/register" element={<Navigate to="/auth" replace />} />
            
            {/* Pages principales modernes Glass Kit */}
            <Route path="/home" element={<HomePageGlassKit />} />
            <Route path="/dashboard" element={<DashboardModern />} />
            
            {/* Page de démonstration Glass Kit */}
            <Route path="/glass-kit" element={<GlassKitExamples />} />
            
            {/* Redirections */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

export default App
