import SearchFiltersForm from "./SearchFiltersForm";

export default function MiniSearch() {
  return (
    <div className="container-fluid bg-light-subtle shadow-sm py-3 mb-4">
      <div className="container">
        <SearchFiltersForm variant="mini" />
      </div>
    </div>
  );
}
