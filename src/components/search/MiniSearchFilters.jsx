import React from "react";
import SelectField from "./partials/SelectField";
import ComboboxField from "./partials/ComboboxField";

export default function MiniSearchFilters({
  variant = "mini",
  propertyTypeOptions = [],
  priceMinOptions = [],
  priceMaxOptions = [],
  bedroomOptions = [],
  dateOptions = [],
  postcodeList = [],
  locationList = [],
  filters = {},
  handleFilterChange = () => {},
  resetFilters = () => {},
  handleSubmit = () => {},
}) {
  return (
    <form className="search-form search-form--mini p-5 mx-5" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-2">
          <SelectField
            id={`propertyType-${variant}`}
            label="Type"
            data={propertyTypeOptions}
            value={
              propertyTypeOptions.find(
                (o) => o.value === filters.propertyType
              ) || null
            }
            onChange={(val) =>
              handleFilterChange("propertyType", val ? val.value : "")
            }
            placeholder="Any"
          />
        </div>

        <div className="col-md-2">
          <SelectField
            id={`minPrice-${variant}`}
            label="Min Price"
            data={priceMinOptions}
            value={
              priceMinOptions.find((o) => o.value === filters.minPrice) || null
            }
            onChange={(val) =>
              handleFilterChange("minPrice", val ? val.value : "")
            }
            placeholder="Min price"
          />
        </div>

        <div className="col-md-2">
          <SelectField
            id={`maxPrice-${variant}`}
            label="Max Price"
            data={priceMaxOptions}
            value={
              priceMaxOptions.find((o) => o.value === filters.maxPrice) || null
            }
            onChange={(val) =>
              handleFilterChange("maxPrice", val ? val.value : "")
            }
            placeholder="Max price"
          />
        </div>

        <div className="col-md-2">
          <SelectField
            label="Min Beds"
            data={bedroomOptions}
            value={
              bedroomOptions.find((o) => o.value === filters.minBedrooms) ||
              null
            }
            onChange={(val) =>
              handleFilterChange("minBedrooms", val ? val.value : "")
            }
            placeholder="Min"
          />
        </div>

        <div className="col-md-2">
          <SelectField
            label="Max Beds"
            data={bedroomOptions}
            value={
              bedroomOptions.find((o) => o.value === filters.maxBedrooms) ||
              null
            }
            onChange={(val) =>
              handleFilterChange("maxBedrooms", val ? val.value : "")
            }
            placeholder="Max"
          />
        </div>

        <div className="col-md-2">
          <SelectField
            label="Added"
            data={dateOptions}
            value={
              dateOptions.find((o) => o.value === filters.dateAdded) || null
            }
            onChange={(val) =>
              handleFilterChange("dateAdded", val ? val.value : "")
            }
            placeholder="Any"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <ComboboxField
            id={`postcode-${variant}`}
            label="Postcode"
            data={postcodeList}
            value={filters.postcodeArea}
            onChange={(val) => handleFilterChange("postcodeArea", val || "")}
            placeholder="SW1"
          />
        </div>

        <div className="col-md-5">
          <ComboboxField
            id={`location-${variant}`}
            label="Location"
            data={locationList}
            value={filters.location}
            onChange={(val) => handleFilterChange("location", val || "")}
            placeholder="Ex. London, Edinburgh"
          />
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <span></span>
          <button
            type="button"
            className="btn btn-danger w-100 mb-1"
            onClick={(e) => resetFilters(e)}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
