// Tests for Favourites context (moved to .jsx to ensure JSX parsing is handled correctly).
import React, { act } from "react"; // Import React and act from React to avoid react-dom/test-utils deprecation
import { renderHook } from "@testing-library/react";
import { FavouritesProvider } from "../context/FavouritesContext";
import { useFavourites } from "../hooks/useFavourites";

function wrapper({ children }) {
  return <FavouritesProvider>{children}</FavouritesProvider>;
}

describe("Favourites context", () => {
  test("add, prevent duplicate, remove and clear", () => {
    const { result } = renderHook(() => useFavourites(), { wrapper });

    act(() => result.current.addFavourite({ id: "p1" }));
    expect(result.current.favourites).toHaveLength(1);

    act(() => result.current.addFavourite({ id: "p1" }));
    expect(result.current.favourites).toHaveLength(1); // duplicate prevented

    act(() => result.current.addFavourite({ id: "p2" }));
    expect(result.current.favourites).toHaveLength(2);

    act(() => result.current.removeFavourite("p1"));
    expect(result.current.favourites).toHaveLength(1);

    act(() => result.current.clearFavourites());
    expect(result.current.favourites).toHaveLength(0);
  });
});
