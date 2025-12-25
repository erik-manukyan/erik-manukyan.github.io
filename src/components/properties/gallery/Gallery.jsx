import React, { useMemo } from "react";
import ImageCard from "../imagecard/ImageCard";
import { useFilters } from "../../../hooks/useFilters";
import "../imagecard/ImageCard";
import "./Gallery.css";
import { useProperties } from "../../../hooks/useProperties";

// month name → index map (module level so it's not recreated on every render)
const MONTHS = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function SkeletonCard() {
  return (
    <div className="card shadow-sm skeleton-card">
      <div className="skeleton-image"></div>
      <div className="card-body">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-price"></div>
        <div className="skeleton-text skeleton-line"></div>
        <div className="skeleton-text skeleton-line short"></div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { filters } = useFilters();
  const { properties, loading, error } = useProperties();

  // memoize filtered list to avoid recomputing on unrelated renders
  const filteredProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];

    return properties.filter((property) => {
      // Location (allow empty query)
      const qLoc = (filters.location || "").toLowerCase().trim();
      if (qLoc && !property.location?.toLowerCase().includes(qLoc))
        return false;

      // Property Type (exact match)
      if (
        filters.propertyType &&
        filters.propertyType.trim() &&
        property.type !== filters.propertyType
      ) {
        return false;
      }

      // Price Range
      const minP = filters.minPrice ? Number(filters.minPrice) : null;
      const maxP = filters.maxPrice ? Number(filters.maxPrice) : null;
      if (minP !== null && property.price < minP) return false;
      if (maxP !== null && property.price > maxP) return false;

      // Bedrooms Range
      const minB = filters.minBedrooms ? Number(filters.minBedrooms) : null;
      const maxB = filters.maxBedrooms ? Number(filters.maxBedrooms) : null;
      if (minB !== null && property.bedrooms < minB) return false;
      if (maxB !== null && property.bedrooms > maxB) return false;

      // Postcode Area (optional) - extract from location string
      const qPost = (filters.postcodeArea || "").toLowerCase().trim();
      if (qPost && !property.location?.toLowerCase().includes(qPost))
        return false;

      // Date Added within last N days — guard against missing or malformed dates
      if (filters.dateAdded) {
        const added = property.added;
        if (!added || !added.month || !added.day || !added.year) return false;
        const monthIndex = MONTHS[added.month];
        if (typeof monthIndex !== "number") return false;
        const propertyDate = new Date(added.year, monthIndex, added.day);
        const today = new Date();
        const daysDifference = Math.floor(
          (today - propertyDate) / (1000 * 60 * 60 * 24)
        );
        if (daysDifference > Number(filters.dateAdded)) return false;
      }

      return true;
    });
  }, [properties, filters]);

  if (loading) {
    return (
      <div className="gallery" aria-busy="true" aria-live="polite">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Failed to load properties. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      {filteredProperties.length === 0 ? (
        <div className="py-4 text-center text-muted">
          <p className="mb-0">No properties match your search criteria.</p>
          <small>Try clearing some filters to see more results.</small>
        </div>
      ) : (
        filteredProperties.map((property) => (
          <ImageCard key={property.id} property={property} />
        ))
      )}
    </div>
  );
}
