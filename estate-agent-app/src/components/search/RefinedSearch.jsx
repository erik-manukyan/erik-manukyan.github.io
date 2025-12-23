import SearchFiltersForm from "./SearchFiltersForm";
import "./RefinedSearch.css";
export default function RefinedSearch() {
  return (
    <div
      className="refined-search-container refined-search-enter"
   
    >
      <div className="container text-start p-0">
        <section className="text-center mt-4">
          <h3>Refined search for your future home</h3>
        </section>
        <div className="card bg-light-subtle shadow-sm">
          {/* Header */}
          <div className="card-header bg-info-subtle fw-semibold">
            Refine Your Search
          </div>
          <div className="card-body">
            <SearchFiltersForm variant="full" />
          </div>
        </div>
      </div>
    </div>
  );
}
