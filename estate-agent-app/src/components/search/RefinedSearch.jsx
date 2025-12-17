import FormSelect from "../common/FormSelect";
import RangeSelect from "../common/RangeSelect";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../../hooks/useFilters";
import "./RefinedSearch.css";

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

const dateOptions = [
  { value: "1", label: "Last 24 hours" },
  { value: "3", label: "Last 3 days" },
  { value: "7", label: "Last week" },
  { value: "14", label: "Last 2 weeks" },
];

export default function RefinedSearch() {
  const { filters, handleFilterChange, setHasSearched } = useFilters();

  const navigate = useNavigate();

  const handleSearch = () => {
    setHasSearched(true);
    navigate("/search-results");
  };
  return (
    <div className="refined-search-container refined-search-enter">
      <div className="container text-start">
        <section className="text-center mt-5 ">
          <h3>Refined search for your future home</h3>
        </section>
        <div className="card bg-light-subtle shadow-sm">
          {/* Header */}
          <div className="card-header bg-info-subtle fw-semibold">
            Refine Your Search
          </div>

          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              {/* Row 1: Type + Price */}
              <div className="row g-4 mb-3">
                <div className="col-md-4">
                  <FormSelect
                    id="propertyType"
                    label="Property type"
                    value={filters.propertyType}
                    onChange={(e) =>
                      handleFilterChange("propertyType", e.target.value)
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
                    onMinChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    onMaxChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    options={priceOptions}
                    minPlaceholder="Min price"
                    maxPlaceholder="Max price"
                  />
                </div>
              </div>

              {/* Row 2: Postcode + Bedrooms */}
              <div className="row g-4 mb-3">
                <div className="col-md-4">
                  <label htmlFor="postcode-area" className="form-label">
                    Postcode area
                  </label>
                  <input
                    id="postcode-area"
                    type="text"
                    value={filters.postcodeArea}
                    onChange={(e) =>
                      handleFilterChange("postcodeArea", e.target.value)
                    }
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
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <FormSelect
                    id="added"
                    label="Added to site"
                    value={filters.dateAdded}
                    onChange={(e) =>
                      handleFilterChange("dateAdded", e.target.value)
                    }
                    options={dateOptions}
                    placeholder="Any"
                  />
                </div>

                <div className="col-md-8">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={filters.location}
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                      className="form-control"
                      placeholder="Ex. London, Edinburgh"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary rounded-end"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
