import { useFilters } from "../../context/FilterContext";

export default function LocationSearch({ setShowFilters }) {
  const { filters, handleFilterChange } = useFilters();

  return (
    <div className="input-group">
      <input
        type="text"
        id="location"
        name="location"
        value={filters.location}
        onChange={(e) => handleFilterChange("location", e.target.value)}
        className="form-control"
        placeholder="Ex. London, Edinburgh"
      />
      {setShowFilters && (
        <button
          type="button"
          className="btn btn-primary rounded-end"
          onClick={() => setShowFilters(true)}
        >
          Search
        </button>
      )}
    </div>
  );
}
