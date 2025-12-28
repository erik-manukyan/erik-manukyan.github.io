import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import "./PropertyDetails.css";
import { useProperties } from "../../../hooks/useProperties";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Default styling
import { useFavourites } from "../../../hooks/useFavourites";

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties, loading, error } = useProperties();
  const property = useMemo(
    () => properties.find((p) => p.id === id) || null,
    [properties, id]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAdded, setShowAdded] = useState(false);
  const { addFavourite } = useFavourites();

  if (error) console.error("Failed to load properties.json:", error);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mt-5 text-center">
        <h2>Property not found</h2>
        <Link to="/search-results" className="btn btn-primary mt-3">
          Back to Search Results
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Back Button */}
      <Link to="/search-results" className="btn btn-outline-secondary mb-3">
        <i className="fa-solid fa-arrow-left me-2"></i>
        Back to Results
      </Link>

      {/* Location Header */}
      <h1 className="mb-4">
        <i className="fa-solid fa-location-dot text-danger me-2"></i>
        {property.location}
      </h1>

      <div className="row">
        {/* Left Column - Gallery */}
        <div className="col-lg-6">
          {/* Hero Image with Navigation */}
          <div className="mb-3 position-relative overflow-hidden rounded shadow">
            <img
              src={`/${property.images[activeIndex]}`}
              alt={`${property.type} in ${property.location}`}
              className="img-fluid hero-image hero-image--small"
            />

            {/* Previous Button - Full Height */}
            <button
              className="position-absolute top-0 start-0 h-100 border-0 d-flex align-items-center justify-content-center gallery-nav-btn gallery-nav-btn--prev"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? property.images.length - 1 : prev - 1
                )
              }
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left text-white fs-4"></i>
            </button>

            {/* Next Button - Full Height */}
            <button
              className="position-absolute top-0 end-0 h-100 border-0 d-flex align-items-center justify-content-center gallery-nav-btn gallery-nav-btn--next"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === property.images.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right text-white fs-4"></i>
            </button>

            {/* Image Counter */}
            <span className="position-absolute bottom-0 end-0 me-2 mb-2 badge bg-dark bg-opacity-75">
              {activeIndex + 1} / {property.images.length}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={`/${image}`}
                alt={`Property image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`rounded thumbnail thumbnail--small ${
                  index === activeIndex
                    ? "border border-3 border-primary"
                    : "border opacity-75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Short Description + Tabs */}
        <div className="col-lg-6">
          {/* Short Description Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body py-3">
              <h3 className="text-primary fw-bold mb-2">
                £{property.price.toLocaleString()}
              </h3>

              <div className="d-flex flex-wrap gap-3 mb-2 small">
                <span>
                  <i className="fa-solid fa-house me-1 text-muted"></i>
                  {property.type}
                </span>
                <span>
                  <i className="fa-solid fa-bed me-1 text-muted"></i>
                  {property.bedrooms} Beds
                </span>
                <span>
                  <i className="fa-solid fa-file-contract me-1 text-muted"></i>
                  {property.tenure}
                </span>
                <span>
                  <i className="fa-solid fa-calendar me-1 text-muted"></i>
                  {property.added.day} {property.added.month}{" "}
                  {property.added.year}
                </span>
              </div>

              {/* Action Button */}
              <div className="d-inline-flex align-items-center gap-2">
                <button
                  onClick={() => {
                    addFavourite(property);
                    setShowAdded(true);
                    setTimeout(() => setShowAdded(false), 1500);
                  }}
                  className="btn btn-outline-danger btn-sm btn-favourite-animate"
                >
                  <i className="fa-solid fa-heart me-1"></i>
                  Add to Favourites
                </button>
                {showAdded && (
                  <span className="added-message text-success fw-semibold">
                    Added!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <Tabs className="property-tabs">
            <TabList>
              <Tab>
                <i className="fa-solid fa-align-left me-1"></i>Description
              </Tab>
              <Tab>
                <i className="fa-solid fa-layer-group me-1"></i>Floor Plan
              </Tab>
              <Tab>
                <i className="fa-solid fa-map me-1"></i>Map
              </Tab>
            </TabList>
            <TabPanel>
              <h5>Property Description</h5>
              <p className="text-muted small property-description">
                {property.description}
              </p>
            </TabPanel>
            <TabPanel>
              {property.floorPlan ? (
                <img
                  src={`/${property.floorPlan}`}
                  alt="Floor Plan"
                  className="img-fluid rounded floor-plan-image"
                />
              ) : (
                <p className="text-muted">Floor plan not available.</p>
              )}
            </TabPanel>
            <TabPanel>
              {property.map ? (
                <iframe
                  title="Property Location"
                  src={`https://www.google.com/maps?q=${property.map.lat},${property.map.lng}&output=embed`}
                  width="100%"
                  height="200"
                  className="rounded map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <p className="text-muted">Map not available.</p>
              )}
            </TabPanel> 
          </Tabs>
        </div>
      </div>
    </div>
  );
}
