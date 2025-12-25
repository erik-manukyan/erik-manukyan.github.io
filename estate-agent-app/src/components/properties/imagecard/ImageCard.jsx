import { Link } from "react-router-dom";
import { useFavourites } from "../../../hooks/useFavourites";
import "./ImageCard.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useRef, useEffect } from "react";

export default function ImageCard({ property, isMini = false }) {
  const {
    type,
    bedrooms,
    price,
    tenure,
    description,
    location,
    images,
    added,
  } = property;

  const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
  const sentences = [...segmenter.segment(description)];
  const { addFavourite, isFavourite, removeFavourite } = useFavourites();

  const toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavourite(property.id)) removeFavourite(property.id);
    else addFavourite(property);
  };

  // Make cards draggable
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${isMini ? "mini" : "full"}-${property.id}`,
      data: { property, isMini },
    });

  // Track if we just finished dragging to prevent click navigation
  const wasDragging = useRef(false);

  useEffect(() => {
    if (isDragging) {
      wasDragging.current = true;
    }
  }, [isDragging]);

  const handleClick = (e) => {
    if (wasDragging.current) {
      e.preventDefault();
      // Reset after a short delay
      setTimeout(() => {
        wasDragging.current = false;
      }, 0);
    }
  };

  // Only keep transform for drag positioning (required by dnd-kit)
  const dragStyle = transform
    ? { transform: CSS.Translate.toString(transform) }
    : {};

  // Mini card layout - compact with background image
  if (isMini) {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="text-decoration-none"
        onClick={handleClick}
      >
        <article
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className={`card border-0 shadow-sm my-2 overflow-hidden image-card-mini position-relative ${
            isDragging ? "dragging" : ""
          }`}
          style={{ ...dragStyle, backgroundImage: `url(/${images[0]})` }}
        >
          {/* Dark overlay for readability */}
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

          {/* Favourite Button - Top Right */}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={toggleFavourite}
            className="btn position-absolute top-0 end-0 m-1 p-0 favourite-btn"
          >
            <i
              className={`fa-heart fs-5 ${
                isFavourite(property.id)
                  ? "fa-solid text-danger"
                  : "fa-regular text-white"
              }`}
            ></i>
          </button>

          {/* Location & Price Overlay */}
          <div className="position-absolute bottom-0 start-0 w-100 p-2 d-flex justify-content-between align-items-center image-card-mini-overlay">
            <span className="text-white small text-truncate me-2">
              <i className="fa-solid fa-location-dot me-1"></i>
              {location}
            </span>
            <span className="badge bg-primary px-2 py-1 small">
              £{price.toLocaleString()}
            </span>
          </div>
        </article>
      </Link>
    );
  }

  // Full card layout
  return (
    <article
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={dragStyle}
      className={`card border-0 shadow-sm my-2 overflow-hidden image-card ${
        isDragging ? "dragging" : ""
      }`}
    >
      <div className="row g-0 ">
        {/* Image Column */}
        <div className="col-md-4 position-relative">
          <img
            src={`/${images[0]}`}
            alt={`${type} in ${location}`}
            className="w-100 image-card-img"
          />
          {/* Price Bar Overlay (full width, bottom) */}
          <div className="position-absolute bottom-0 start-0 w-100 image-card-gradient">
            <div className="image-card-price d-flex justify-content-end align-items-center">
              <span className="fw-semibold">£{price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="col-md-8 d-flex flex-column position-relative">
          {/* Favourite Button - Top Right */}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={toggleFavourite}
            className="btn position-absolute top-0 end-0 m-2 p-0 favourite-btn"
          >
            <i
              className={`fa-heart fs-4 ${
                isFavourite(property.id)
                  ? "fa-solid text-danger"
                  : "fa-regular text-muted"
              }`}
            ></i>
          </button>

          <div
            className={`card-body d-flex flex-column ${isMini ? "" : "h-100"}`}
          >
            {/* Location Header */}
            <h5
              className={`card-title text-dark d-flex align-items-start gap-2 ${
                isMini ? "mb-0 fs-6" : "mb-2"
              }`}
            >
              <i className="fa-solid fa-location-dot text-danger mt-1"></i>
              <span className="text-truncate pb-1">{location}</span>
            </h5>

            {!isMini && (
              <>
                {/* Property Badges */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25">
                    <i className="fa-solid fa-home me-1"></i>
                    {type}
                  </span>
                  <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25">
                    <i className="fa-solid fa-bed me-1"></i>
                    {bedrooms} Beds
                  </span>
                  <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25">
                    <i className="fa-solid fa-file-contract me-1"></i>
                    {tenure}
                  </span>
                </div>
                {/* Description */}
                <p className="card-text text-muted small flex-grow-1 mb-2 image-card-description">
                  {sentences
                    .slice(0, 2)
                    .map((s) => s.segment)
                    .join("")}
                </p>
                {/* Footer */}
                <Link
                  to={`/properties/${property.id}`}
                  className="text-decoration-none"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleClick}
                >
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                    <small className="text-muted">
                      <i className="fa-regular fa-calendar me-1"></i>
                      {added.day} {added.month} {added.year}
                    </small>

                    <span className="text-primary small fw-semibold">
                      View Details{" "}
                      <i className="fa-solid fa-arrow-right ms-1"></i>
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
