import { useNavigate } from "react-router-dom";
import { DropdownList, Combobox } from "react-widgets";
import "react-widgets/styles.css";
import { useFilters } from "../../hooks/useFilters";
import { useState, useEffect } from "react";

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
  const { filters, resetFilters, handleFilterChange, setHasSearched } =
    useFilters();
  const navigate = useNavigate();

  const isMini = variant === "mini";
  const [postcodeList, setPostcodeList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    navigate("/search-results");
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/properties.json");
        const json = await res.json();
        const props = json.properties || [];

        const postcodes = new Set();
        const locations = new Set();

        props.forEach((p) => {
          if (p.location) {
            locations.add(p.location);
            const parts = p.location.trim().split(/\s+/);
            const last = parts[parts.length - 1];
            if (last && /[A-Za-z0-9]/.test(last)) postcodes.add(last);
          }
        });

        if (mounted) {
          setPostcodeList([...postcodes]);
          setLocationList([...locations]);
        }
      } catch (e) {
        console.error("Failed to load properties.json:", e);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  if (isMini) {
    return (
      <form className="search-form search-form--mini" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor={`propertyType-${variant}`} className="form-label">
              Type
            </label>
            <DropdownList
              data={propertyTypes}
              id={`propertyType-${variant}`}
              value={
                propertyTypes.find((o) => o.value === filters.propertyType) ||
                null
              }
              onChange={(val) =>
                handleFilterChange("propertyType", val ? val.value : "")
              }
              textField="label"
              placeholder="Any"
              style={{ minWidth: 90 }}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor={`minPrice-${variant}`} className="form-label">
              Min Price
            </label>
            <DropdownList
              data={priceOptions}
              id={`minPrice-${variant}`}
              value={
                priceOptions.find((o) => o.value === filters.minPrice) || null
              }
              onChange={(val) =>
                handleFilterChange("minPrice", val ? val.value : "")
              }
              textField="label"
              placeholder="Min"
            />
          </div>
          <div className="col-md-2">
            <label htmlFor={`maxPrice-${variant}`} className="form-label">
              Max Price
            </label>
            <DropdownList
               data={priceOptions}
              id={`maxPrice-${variant}`}
              value={
                priceOptions.find((o) => o.value === filters.maxPrice) || null
              }
              onChange={(val) =>
                handleFilterChange("maxPrice", val ? val.value : "")
              }
              textField="label"
              placeholder="Max"
              style={{ minWidth: 90 }}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Min Beds</label>
            <DropdownList
              className="form-control"
              containerClassName="w-100"
              data={bedroomOptions}
              value={
                bedroomOptions.find((o) => o.value === filters.minBedrooms) ||
                null
              }
              onChange={(val) =>
                handleFilterChange("minBedrooms", val ? val.value : "")
              }
              textField="label"
              placeholder="Min"
              style={{ minWidth: 70 }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Max Beds</label>
            <DropdownList
              className="form-control"
              containerClassName="w-100"
              data={bedroomOptions}
              value={
                bedroomOptions.find((o) => o.value === filters.maxBedrooms) ||
                null
              }
              onChange={(val) =>
                handleFilterChange("maxBedrooms", val ? val.value : "")
              }
              textField="label"
              placeholder="Max"
              style={{ minWidth: 70 }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Added</label>
            <DropdownList
              className="form-control"
              containerClassName="w-100"
              data={dateOptions}
              value={
                dateOptions.find((o) => o.value === filters.dateAdded) || null
              }
              onChange={(val) =>
                handleFilterChange("dateAdded", val ? val.value : "")
              }
              textField="label"
              placeholder="Any"
              style={{ minWidth: 90 }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Postcode</label>
            <Combobox
              className="form-control"
              data={postcodeList}
              id={`postcode-${variant}`}
              value={filters.postcodeArea}
              onChange={(val) => handleFilterChange("postcodeArea", val || "")}
              placeholder="SW1"
              style={{ minWidth: 70 }}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor={`location-${variant}`} className="form-label">
              Location
            </label>

            <Combobox
              className="form-control"
              data={locationList}
              value={filters.location}
              onChange={(val) => handleFilterChange("location", val || "")}
              placeholder="Ex. London, Edinburgh"
              style={{ minWidth: 120 }}
            />
          </div>

          <div
            className="col-md-4"
            onClick={(e) => {
              resetFilters(e);
            }}
          >
            <button type="button" className="btn btn-danger">
              Reset
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form className="search-form search-form--full" onSubmit={handleSubmit}>
      {/* Row 1: Type + Price */}
      <div className="row g-3 mb-3">
        <div className="col-md-2">
          <label className="form-label">Property type</label>
          <DropdownList
            className="form-control p-0"
            containerClassName="w-100"
            data={propertyTypes}
            value={
              propertyTypes.find((o) => o.value === filters.propertyType) ||
              null
            }
            onChange={(val) =>
              handleFilterChange("propertyType", val ? val.value : "")
            }
            textField="label"
            placeholder="Any"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Min price</label>
          <DropdownList
            className="form-control p-0"
            containerClassName="w-100"
            data={priceOptions}
            value={
              priceOptions.find((o) => o.value === filters.minPrice) || null
            }
            onChange={(val) =>
              handleFilterChange("minPrice", val ? val.value : "")
            }
            textField="label"
            placeholder="Min price"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Max price</label>
          <DropdownList
            className="form-control p-0"
            containerClassName="w-100"
            data={priceOptions}
            value={
              priceOptions.find((o) => o.value === filters.maxPrice) || null
            }
            onChange={(val) =>
              handleFilterChange("maxPrice", val ? val.value : "")
            }
            textField="label"
            placeholder="Max price"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Min bedrooms</label>
          <DropdownList
            className="form-control p-0"
            containerClassName="w-100"
            data={bedroomOptions}
            value={
              bedroomOptions.find((o) => o.value === filters.minBedrooms) ||
              null
            }
            onChange={(val) =>
              handleFilterChange("minBedrooms", val ? val.value : "")
            }
            textField="label"
            placeholder="Min bedrooms"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Max bedrooms</label>
          <DropdownList
            className="form-control p-0"
            containerClassName="w-100"
            data={bedroomOptions}
            value={
              bedroomOptions.find((o) => o.value === filters.maxBedrooms) ||
              null
            }
            onChange={(val) =>
              handleFilterChange("maxBedrooms", val ? val.value : "")
            }
            textField="label"
            placeholder="Max bedrooms"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Added to site</label>
          <DropdownList
            className="form-control p-0"
            containerClassName="w-100"
            data={dateOptions}
            value={
              dateOptions.find((o) => o.value === filters.dateAdded) || null
            }
            onChange={(val) =>
              handleFilterChange("dateAdded", val ? val.value : "")
            }
            textField="label"
            placeholder="Any"
          />
        </div>
      </div>

      {/* Row 2: Postcode + Location */}
      <div className="row g-3 mb-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Postcode area</label>
          <Combobox
            className="form-control p-0"
            data={postcodeList}
            id="postcode-full"
            value={filters.postcodeArea}
            onChange={(val) => handleFilterChange("postcodeArea", val || "")}
            placeholder="e.g. SW1"
          />
        </div>
        <div className="col-md-8">
          <label className="form-label">Location</label>
          <div className="input-group">
            <Combobox
              className="form-control p-0"
              containerClassName="w-100"
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
