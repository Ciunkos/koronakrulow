import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { unregister } from "./serviceWorker.ts";

const root = document.getElementById("root");

if (!root) {
  throw new Error("index.html has no #root element.");
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

unregister();
