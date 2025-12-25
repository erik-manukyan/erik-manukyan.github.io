import React from "react";

export default function FavouritesEmpty() {
  return (
    <div className="text-center py-4">
      <i className="fa-regular fa-heart text-muted fs-1 mb-3 d-block"></i>
      <p className="text-muted mb-0">No favourite properties yet</p>
      <small className="text-muted">
        Click the heart icon to save properties
      </small>
    </div>
  );
}
