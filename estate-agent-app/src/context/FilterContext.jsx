import { useState } from "react";
import { FilterContext } from "./filterContext";

// Create the provider component
export function FilterProvider({ children }) {
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    propertyType: "",
    minBedrooms: "",
    maxBedrooms: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    postcodeArea: "",
    dateAdded: "",
  });

  const handleFilterChange = (fieldName, value) => {
    setFilters({
      ...filters,
      [fieldName]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      propertyType: "",
      minBedrooms: "",
      maxBedrooms: "",
      minPrice: "",
      maxPrice: "",
      location: "",
      postcodeArea: "",
      dateAdded: "",
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        handleFilterChange,
        resetFilters,
        showFilters,
        setShowFilters,
        hasSearched,
        setHasSearched,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
