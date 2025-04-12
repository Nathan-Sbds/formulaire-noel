import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { initThemeMode } from "flowbite-react";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!; // Il existe pas de panique, je sais faire mon travail !
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* On affiche le formulaire, parce que c'est la star du jour ! Pour une fois il n'y a que lui */}
    </BrowserRouter>
  </StrictMode>,
);

initThemeMode(); // Initialisation du mode sombre (parce que la nuit, tous les chats sont gris !). J'ai vu ca sur internet, ca a l'air de faire un truc (peut-être) !
