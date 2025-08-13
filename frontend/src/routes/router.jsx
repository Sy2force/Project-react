import { createBrowserRouter } from "react-router-dom";
import MainLayoutComplete from "@/layouts/MainLayoutComplete";
import HomeCompleteWorking from "@/pages/HomeCompleteWorking";
import ProjectsComplete from "@/pages/ProjectsComplete";
import BlogComplete from "@/pages/BlogComplete";
import ContactComplete from "@/pages/ContactComplete";
import AboutComplete from "@/pages/AboutComplete";
import LoginComplete from "@/pages/auth/LoginComplete";
import RegisterComplete from "@/pages/auth/RegisterComplete";
import ForgotPasswordComplete from "@/pages/auth/ForgotPasswordComplete";
import DashboardComplete from "@/pages/dashboard/DashboardComplete";
import ProfileComplete from "@/pages/user/ProfileComplete";
import FavoritesComplete from "@/pages/user/FavoritesComplete";
import SettingsComplete from "@/pages/user/SettingsComplete";
import NotFoundComplete from "@/pages/NotFoundComplete";
import Protected from "@/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutComplete />,
    errorElement: <NotFoundComplete />,
    children: [
      // Pages publiques
      { 
        index: true, 
        element: <HomeCompleteWorking /> 
      },
      { 
        path: "projects", 
        element: <ProjectsComplete /> 
      },
      { 
        path: "blog", 
        element: <BlogComplete /> 
      },
      { 
        path: "contact", 
        element: <ContactComplete /> 
      },
      { 
        path: "about", 
        element: <AboutComplete /> 
      },
      
      // Pages d'authentification
      { 
        path: "login", 
        element: <LoginComplete /> 
      },
      { 
        path: "register", 
        element: <RegisterComplete /> 
      },
      { 
        path: "forgot-password", 
        element: <ForgotPasswordComplete /> 
      },
      
      // Pages protégées - Utilisateur connecté
      {
        path: "dashboard",
        element: (
          <Protected roles={["admin", "business", "user"]}>
            <DashboardComplete />
          </Protected>
        ),
      },
      {
        path: "profile",
        element: (
          <Protected roles={["admin", "business", "user"]}>
            <ProfileComplete />
          </Protected>
        ),
      },
      {
        path: "favorites",
        element: (
          <Protected roles={["admin", "business", "user"]}>
            <FavoritesComplete />
          </Protected>
        ),
      },
      {
        path: "settings",
        element: (
          <Protected roles={["admin", "business", "user"]}>
            <SettingsComplete />
          </Protected>
        ),
      },
      
      // Page 404
      {
        path: "*",
        element: <NotFoundComplete />
      }
    ],
  },
]);

export default router;
