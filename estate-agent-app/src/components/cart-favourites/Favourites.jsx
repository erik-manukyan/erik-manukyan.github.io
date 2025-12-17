export default function Favourites() {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning-subtle fw-semibold">
        <i className="bi bi-star-fill"></i> Favourites
      </div>
      <div className="card-body">
        <p className="text-muted text-center">No favourite properties yet</p>
        <div className="d-grid">
          <button className="btn btn-outline-secondary" disabled>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
