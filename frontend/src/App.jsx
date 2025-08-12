import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import HomeOptimized from "./pages/HomeOptimized.jsx";
import ProjectsOptimized from "./pages/ProjectsOptimized.jsx";
import Blog from "./pages/Blog.jsx";
import LoginAdvanced from "./pages/LoginAdvanced.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyCards from "./pages/MyCards.jsx";
import Favorites from "./pages/Favorites.jsx";
import AboutOptimized from "./pages/AboutOptimized.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AdvancedRegister from "./pages/AdvancedRegister.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import Showcase from "./pages/Showcase.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomeOptimized />} />
                <Route path="projects" element={<ProjectsOptimized />} />
                <Route path="projects/:id" element={<ProjectDetail />} />
                <Route path="blog" element={<Blog />} />
                <Route path="about" element={<AboutOptimized />} />
                <Route path="contact" element={<Contact />} />
                <Route path="showcase" element={<Showcase />} />
                <Route path="login" element={<LoginAdvanced />} />
                <Route path="register" element={<Register />} />
                <Route path="register-advanced" element={<AdvancedRegister />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                
                {/* Route 404 - doit être en dernier */}
                <Route path="*" element={<NotFound />} />
                
                {/* Routes protégées pour utilisateurs connectés */}
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="profile/edit" 
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="favorites" 
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Routes protégées pour business/admin */}
                <Route 
                  path="my-cards" 
                  element={
                    <ProtectedRoute requiredRole="business">
                      <MyCards />
                    </ProtectedRoute>
                  } 
                />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
