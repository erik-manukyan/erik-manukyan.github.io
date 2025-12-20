import { useFilters } from "../../hooks/useFilters";
import "./RefinedSearch.css";

export default function SearchBox() {
  const { setShowFilters, filters, handleFilterChange } = useFilters();

  return (
    <section className="text-center mt-5 mb-5 refined-search-enter">
      <h1>Property, done properly.</h1>
      <h3>Search for your future home</h3>
      <form
        className="d-flex flex-column"
        onSubmit={(e) => {
          e.preventDefault();
          setShowFilters(true);
        }}
      >
        <div className="container my-2">
          <div className="row justify-content-center">
            <div className="col-md-6">
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
                <button type="submit" className="btn btn-primary rounded-end">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
