import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import AppOptimized from "./AppOptimized.jsx";
import "./index.css";

const rootEl = document.getElementById("root");
createRoot(rootEl).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppOptimized />
    </HelmetProvider>
  </React.StrictMode>
);
