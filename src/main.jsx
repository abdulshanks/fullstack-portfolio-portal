import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 1. IMPORT BOOTSTRAP STYLES AND ICONS HERE BEFORE THE APP LOADS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// 2. KEEP YOUR BASE CORE ENTRIES
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
