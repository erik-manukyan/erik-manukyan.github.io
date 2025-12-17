import LocationSearch from "./LocationSearch";
import { useFilters } from "../../context/FilterContext";

export default function SearchBox({ setShowFilters }) {
  const { filters, handleFilterChange } = useFilters();

  return (
    <section className="text-center mt-5 mb-5">
      <h1>Property, done properly.</h1>
      <h3>Search for your future home</h3>
      <form className="d-flex flex-column">
        <div className="container my-2">
          <div className="row">
            <LocationSearch
              filters={filters}
              handleFilterChange={handleFilterChange}
              setShowFilters={setShowFilters}
            />
          </div>
        </div>
      </form>
    </section>
  );
}
