import { useNavigate } from "react-router-dom";
import FormSelect from "../common/FormSelect";
import RangeSelect from "../common/RangeSelect";
import { useFilters } from "../../hooks/useFilters";

// Shared configuration data
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

const dateOptions = [
  { value: "1", label: "Last 24 hours" },
  { value: "3", label: "Last 3 days" },
  { value: "7", label: "Last week" },
  { value: "14", label: "Last 2 weeks" },
];

export default function SearchFiltersForm({ variant = "full" }) {
  const { filters, handleFilterChange, setHasSearched } = useFilters();
  const navigate = useNavigate();

  const isMini = variant === "mini";

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    navigate("/search-results");
  };

  if (isMini) {
    return (
      <form className="search-form search-form--mini" onSubmit={handleSubmit}>
        <div className="row g-2 align-items-end">
          <div className="col-auto">
            <FormSelect
              id={`propertyType-${variant}`}
              label="Type"
              value={filters.propertyType}
              onChange={(e) =>
                handleFilterChange("propertyType", e.target.value.trim())
              }
              options={propertyTypes}
              placeholder="Any"
            />
          </div>

          <div className="col-auto">
            <FormSelect
              id={`minPrice-${variant}`}
              label="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              options={priceOptions}
              placeholder="Min"
            />
          </div>

          <div className="col-auto">
            <FormSelect
              id={`maxPrice-${variant}`}
              label="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              options={priceOptions}
              placeholder="Max"
            />
          </div>

          <div className="col-auto">
            <label htmlFor={`postcode-area-${variant}`} className="form-label">
              Postcode
            </label>
            <input
              id={`postcode-area-${variant}`}
              type="text"
              value={filters.postcodeArea}
              onChange={(e) =>
                handleFilterChange("postcodeArea", e.target.value)
              }
              className="form-control"
              placeholder="SW1"
              style={{ width: "80px" }}
            />
          </div>

          <div className="col-auto">
            <FormSelect
              id={`minBedrooms-${variant}`}
              label="Min Beds"
              value={filters.minBedrooms}
              onChange={(e) =>
                handleFilterChange("minBedrooms", e.target.value)
              }
              options={bedroomOptions}
              placeholder="Min"
            />
          </div>

          <div className="col-auto">
            <FormSelect
              id={`maxBedrooms-${variant}`}
              label="Max Beds"
              value={filters.maxBedrooms}
              onChange={(e) =>
                handleFilterChange("maxBedrooms", e.target.value)
              }
              options={bedroomOptions}
              placeholder="Max"
            />
          </div>

          <div className="col-auto">
            <FormSelect
              id={`added-${variant}`}
              label="Added"
              value={filters.dateAdded}
              onChange={(e) => handleFilterChange("dateAdded", e.target.value)}
              options={dateOptions}
              placeholder="Any"
            />
          </div>

          <div className="col">
            <label htmlFor={`location-${variant}`} className="form-label">
              Location
            </label>
            <div className="input-group">
              <input
                type="text"
                id={`location-${variant}`}
                name="location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="form-control"
                placeholder="Ex. London, Edinburgh"
              />
              <button type="submit" className="btn btn-primary">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form className="search-form search-form--full" onSubmit={handleSubmit}>
      {/* Row 1: Type + Price */}
      <div className="row g-4 mb-3">
        <div className="col-md-4">
          <FormSelect
            id={`propertyType-${variant}`}
            label="Property type"
            value={filters.propertyType}
            onChange={(e) =>
              handleFilterChange("propertyType", e.target.value.trim())
            }
            options={propertyTypes}
            placeholder="Any"
          />
        </div>

        <div className="col-md-8">
          <RangeSelect
            label="Price range"
            minValue={filters.minPrice}
            maxValue={filters.maxPrice}
            onMinChange={(e) => handleFilterChange("minPrice", e.target.value)}
            onMaxChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            options={priceOptions}
            minPlaceholder="Min price"
            maxPlaceholder="Max price"
          />
        </div>
      </div>

      {/* Row 2: Postcode + Bedrooms */}
      <div className="row g-4 mb-3">
        <div className="col-md-4">
          <label htmlFor={`postcode-area-${variant}`} className="form-label">
            Postcode area
          </label>
          <input
            id={`postcode-area-${variant}`}
            type="text"
            value={filters.postcodeArea}
            onChange={(e) => handleFilterChange("postcodeArea", e.target.value)}
            className="form-control"
            placeholder="e.g. SW1"
          />
        </div>

        <div className="col-md-8">
          <RangeSelect
            label="Bedrooms"
            minValue={filters.minBedrooms}
            maxValue={filters.maxBedrooms}
            onMinChange={(e) =>
              handleFilterChange("minBedrooms", e.target.value)
            }
            onMaxChange={(e) =>
              handleFilterChange("maxBedrooms", e.target.value)
            }
            options={bedroomOptions}
            minPlaceholder="Min bedrooms"
            maxPlaceholder="Max bedrooms"
          />
        </div>
      </div>

      {/* Row 3: Added + Location */}
      <div className="row g-4 align-items-end">
        <div className="col-md-4">
          <FormSelect
            id={`added-${variant}`}
            label="Added to site"
            value={filters.dateAdded}
            onChange={(e) => handleFilterChange("dateAdded", e.target.value)}
            options={dateOptions}
            placeholder="Any"
          />
        </div>

        <div className="col-md-8">
          <label htmlFor={`location-${variant}`} className="form-label">
            Location
          </label>
          <div className="input-group">
            <input
              type="text"
              id={`location-${variant}`}
              name="location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="form-control"
              placeholder="Ex. London, Edinburgh"
            />
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
