import { useNavigate } from "react-router-dom";

import "react-widgets/styles.css";
import { useFilters } from "../../hooks/useFilters";
import { useMemo } from "react";
import SelectField from "./partials/SelectField";
import ComboboxField from "./partials/ComboboxField";
import MiniSearchFilters from "./MiniSearchFilters";
import { useProperties } from "../../hooks/useProperties";

import {
  getUniquePropertyTypes,
  getBedroomOptions,
  getLocationList,
  getPostcodeList,
  getPriceBuckets,
} from "./optionsGenerator";

const dateOptions = [
  { value: "1", label: "Last 24 hours" },
  { value: "3", label: "Last 3 days" },
  { value: "7", label: "Last week" },
  { value: "14", label: "Last 2 weeks" },
];

export default function SearchFiltersForm({ variant = "full" }) {
  const { filters, resetFilters, handleFilterChange, setHasSearched } =
    useFilters();
  const navigate = useNavigate();

  const isMini = variant === "mini";
  const { properties } = useProperties();

  const postcodeList = useMemo(() => getPostcodeList(properties), [properties]);
  const locationList = useMemo(() => getLocationList(properties), [properties]);

  // computed options (derived from `properties`)
  const propertyTypeOptions = useMemo(
    () => getUniquePropertyTypes(properties),
    [properties]
  );
  const bedroomOptions = useMemo(
    () => getBedroomOptions(properties),
    [properties]
  );
  const priceBuckets = useMemo(
    () => getPriceBuckets(properties, 6),
    [properties]
  );
  const priceMinOptions = useMemo(
    () =>
      priceBuckets.map((r) => ({
        value: String(r.min),
        label: `£${r.min.toLocaleString()}+`,
      })),
    [priceBuckets]
  );
  const priceMaxOptions = useMemo(
    () =>
      priceBuckets.map((r) => ({
        value: String(r.max),
        label: `Up to £${r.max.toLocaleString()}`,
      })),
    [priceBuckets]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    navigate("/search-results");
  };

  if (isMini) {
    return (
      <MiniSearchFilters
        variant={variant}
        propertyTypeOptions={propertyTypeOptions}
        priceMinOptions={priceMinOptions}
        priceMaxOptions={priceMaxOptions}
        bedroomOptions={bedroomOptions}
        dateOptions={dateOptions}
        postcodeList={postcodeList}
        locationList={locationList}
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <form className="search-form search-form--full" onSubmit={handleSubmit}>
      {/* Row 1: Type + Price */}
      <div className="row g-3 mb-3">
        <div className="col-md-2">
          <SelectField
            label="Property type"
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
            label="Min price"
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
            label="Max price"
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
            label="Min bedrooms"
            data={bedroomOptions}
            value={
              bedroomOptions.find((o) => o.value === filters.minBedrooms) ||
              null
            }
            onChange={(val) =>
              handleFilterChange("minBedrooms", val ? val.value : "")
            }
            placeholder="Min bedrooms"
          />
        </div>
        <div className="col-md-2">
          <SelectField
            label="Max bedrooms"
            data={bedroomOptions}
            value={
              bedroomOptions.find((o) => o.value === filters.maxBedrooms) ||
              null
            }
            onChange={(val) =>
              handleFilterChange("maxBedrooms", val ? val.value : "")
            }
            placeholder="Max bedrooms"
          />
        </div>
        <div className="col-md-2">
          <SelectField
            label="Added to site"
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

      {/* Row 2: Postcode + Location */}
      <div className="row g-3 mb-3 align-items-end">
        <div className="col-md-4">
          <ComboboxField
            id="postcode-full"
            label="Postcode area"
            data={postcodeList}
            value={filters.postcodeArea}
            onChange={(val) => handleFilterChange("postcodeArea", val || "")}
            placeholder="e.g. SW1"
          />
        </div>
        <div className="col-md-8">
          <label className="form-label">Location</label>
          <div className="input-group">
            <ComboboxField
              noWrapper
              id="location-full"
              data={locationList}
              value={filters.location}
              onChange={(val) => handleFilterChange("location", val || "")}
              placeholder="Ex. London, Edinburgh"
            />
            <button type="submit" className="btn btn-primary input-group-text">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
