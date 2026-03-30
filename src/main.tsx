import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./app/providers/app";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
