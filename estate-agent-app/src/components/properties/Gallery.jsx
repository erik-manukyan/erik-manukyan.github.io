import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import { useFilters } from "../../hooks/useFilters";
import "./ImageCard.css";

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
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/properties.json");
      const data = await response.json();
      setProperties(data.properties);
      setLoading(false);
    };
    fetchData();
  }, []);

  const months = {
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

  const filteredProperties = properties.filter((property) => {
    // Location (allow empty query)
    const qLoc = (filters.location || "").toLowerCase().trim();
    if (qLoc && !property.location?.toLowerCase().includes(qLoc)) return false;

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

    // Date Added within last N days
    if (filters.dateAdded) {
      const propertyDate = new Date(
        property.added.year,
        months[property.added.month],
        property.added.day
      );
      const today = new Date();
      const daysDifference = Math.floor(
        (today - propertyDate) / (1000 * 60 * 60 * 24)
      );
      if (daysDifference > Number(filters.dateAdded)) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="gallery">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="gallery">
      {filteredProperties.map((property) => (
        <ImageCard key={property.id} property={property} />
      ))}
    </div>
  );
}
