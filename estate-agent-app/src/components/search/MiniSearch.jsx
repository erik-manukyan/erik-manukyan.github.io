import { useFilters } from "../../hooks/useFilters";
import FormSelect from "../common/FormSelect";

// Configuration data
const propertyTypes = [
  { value: "House", label: "House" },
  { value: "Flat", label: "Flat" },
  { value: "Bungalow", label: "Bungalow" },
];

const priceOptions = [
  { value: "200000", label: "£200,000" },
  { value: "300000", label: "£300,000" },
  { value: "400000", label: "£400,000" },
  { value: "500000", label: "£500,000" },
  { value: "750000", label: "£750,000" },
  { value: "1000000", label: "£1,000,000" },
];

const bedroomOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
];

export default function MiniSearch() {
  const { filters, handleFilterChange } = useFilters();

  return (
    <div className="container-fluid bg-light-subtle shadow-sm py-3 mb-4">
      <div className="container">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <FormSelect
              id="propertyType-mini"
              label="Type"
              value={filters.propertyType}
              onChange={(e) =>
                handleFilterChange("propertyType", e.target.value)
              }
              options={propertyTypes}
              placeholder="Any"
            />
          </div>

          <div className="col-md-2">
            <FormSelect
              id="bedrooms-mini"
              label="Beds"
              value={filters.minBedrooms}
              onChange={(e) =>
                handleFilterChange("minBedrooms", e.target.value)
              }
              options={bedroomOptions}
              placeholder="Any"
            />
          </div>

          <div className="col-md-2">
            <FormSelect
              id="price-mini"
              label="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              options={priceOptions}
              placeholder="Any"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="location-mini" className="form-label">
              Location
            </label>
            <input
              type="text"
              id="location-mini"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="form-control"
              placeholder="Ex. London, Edinburgh"
            />
          </div>

          <div className="col-md-2">
            <button type="button" className="btn btn-primary w-100">
              Update Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
