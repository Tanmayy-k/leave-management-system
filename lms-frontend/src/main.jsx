// ─────────────────────────────────────────────────────────────────────────────
// Leave Management System — Frontend
// Stack : React 18 + Vite + Tailwind CSS v4 + Axios + React Router v6
// Backend: Spring Boot 3 + Spring Security 6 + JWT + MySQL
// Dev    : npm run dev      → http://localhost:5173
// Build  : npm run build    → dist/
// ─────────────────────────────────────────────────────────────────────────────
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
