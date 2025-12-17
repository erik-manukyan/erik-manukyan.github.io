export default function Cart() {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white fw-semibold">
        <i className="bi bi-cart3"></i> Cart
      </div>
      <div className="card-body">
        <p className="text-muted text-center">No properties in cart</p>
        <div className="d-grid">
          <button className="btn btn-outline-secondary" disabled>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
