import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MoviesProvider } from "./contexts/MoviesContext";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </AuthProvider>
);
