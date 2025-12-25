import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import "./index.css";
import App from "./App.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </FilterProvider>
    </BrowserRouter>
  </StrictMode>
);
