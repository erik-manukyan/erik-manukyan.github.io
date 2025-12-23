import { useDroppable } from "@dnd-kit/core";
import { useFavourites } from "../../hooks/useFavourites";
import ImageCard from "../properties/ImageCard";

export default function Favourites() {
  const { favourites, clearFavourites } = useFavourites();
  const { setNodeRef, isOver } = useDroppable({
    id: "favourites",
  });
  return (
    <div className="card shadow-sm border-0">
      {/* Header with counter badge */}
      <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
        <span className="fw-semibold">
          <i className="fa-solid fa-heart me-2"></i>
          Favourites
        </span>
        {favourites.length > 0 && (
          <span className="badge bg-white text-danger rounded-pill">
            {favourites.length}
          </span>
        )}
      </div>

      {/* Body */}
      <div
        ref={setNodeRef}
        className={`card-body p-2 ${isOver ? "bg-danger bg-opacity-10" : ""}`}
      >
        {!favourites.length ? (
          <div className="text-center py-4">
            <i className="fa-regular fa-heart text-muted fs-1 mb-3 d-block"></i>
            <p className="text-muted mb-0">No favourite properties yet</p>
            <small className="text-muted">
              Click the heart icon to save properties
            </small>
          </div>
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
              className="btn btn-outline-danger btn-sm"
              onClick={() => clearFavourites()}
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
