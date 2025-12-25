import { useDroppable } from "@dnd-kit/core";
import { useFavourites } from "../../hooks/useFavourites";
import ImageCard from "../properties/imagecard/ImageCard";
import FavouritesEmpty from "./FavouritesEmpty";
import { useEffect, useRef, useState } from "react";
import "./Favourites.css";

export default function Favourites() {
  const { favourites, clearFavourites } = useFavourites();
  const { setNodeRef, isOver } = useDroppable({
    id: "favourites",
  });

  const [animateDrop, setAnimateDrop] = useState(false);
  const prevCount = useRef(favourites.length);
  const dropTimeout = useRef();

  useEffect(() => {
    // When favourites count increases, trigger animation on next tick
    if (favourites.length > prevCount.current) {
      clearTimeout(dropTimeout.current);
      // ensure state update happens outside the effect sync phase
      dropTimeout.current = setTimeout(() => {
        setAnimateDrop(true);
        // remove animation after duration
        dropTimeout.current = setTimeout(() => setAnimateDrop(false), 700);
      }, 0);
    }
    prevCount.current = favourites.length;
    return () => clearTimeout(dropTimeout.current);
  }, [favourites.length]);

  const handleClear = () => {
    if (confirm("Clear all favourites?")) clearFavourites();
  };

  return (
    <div
      className={`card shadow-sm border-0 ${
        animateDrop ? "favourites-animate" : ""
      }`}
    >
      <div
        className={`card-header bg-danger text-white d-flex justify-content-between align-items-center ${
          isOver ? "favourites-drop-highlight" : ""
        }`}
      >
        <span className="fw-semibold">
          <i className="fa-solid fa-heart me-2"></i>
          Favourites
        </span>
        {favourites.length > 0 && (
          <span
            className="badge bg-white text-danger rounded-pill"
            aria-live="polite"
            aria-atomic="true"
            aria-label={`${favourites.length} favourites`}
          >
            {favourites.length}
          </span>
        )}
      </div>

      {/* Body */}
      <div
        ref={setNodeRef}
        className={`card-body p-2 ${isOver ? "bg-danger bg-opacity-10" : ""}`}
      >
        {isOver && (
          <div className="text-center text-danger mb-2 small">
            Drop here to add to favourites
          </div>
        )}
        {!favourites.length ? (
          <FavouritesEmpty />
        ) : (
          <div className="d-flex flex-column gap-2">
            {favourites.map((favourite) => (
              <ImageCard
                key={favourite.id}
                property={favourite}
                isMini={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer with Clear button */}
      {favourites.length > 0 && (
        <div className="card-footer bg-transparent border-top">
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleClear}
              aria-label="Clear all favourites"
            >
              <i className="fa-solid fa-trash-can me-2"></i>
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
