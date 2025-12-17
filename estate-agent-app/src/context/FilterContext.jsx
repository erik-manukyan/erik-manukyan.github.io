import { createContext, useState, useContext } from "react";

// Create the context
const FilterContext = createContext();

// Create the provider component
export function FilterProvider({ children }) {
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
      value={{ filters, handleFilterChange, resetFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}

// Custom hook to use the context
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}
