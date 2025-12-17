import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard/ImageCard";
import { useFilters } from "../../hooks/useFilters";

export default function Gallery() {
  const { filters } = useFilters();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/properties.json");
      const data = await response.json();
      setProperties(data.properties);
    };
    fetchData();
  }, []);

  return (
    <div className="container p-1">
      <div>
        <h2>Properties</h2>
        <div className="gallery">
          {properties.map((property) => (
            <ImageCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      <div className="favorites">
        <h2>Favorites</h2>
        {/* Add your favorites content here */}
      </div>
    </div>
  );
}
