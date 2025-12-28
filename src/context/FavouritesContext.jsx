import React, { useState } from "react";
import { FavouritesContext } from "./favouritesContext";

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (property) => {
    if (!favourites.some((fav) => fav.id === property.id))
      setFavourites([...favourites, property]);
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((property) => property.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const isFavourite = (id) => {
    return favourites.some((fav) => fav.id === id);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        clearFavourites,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
