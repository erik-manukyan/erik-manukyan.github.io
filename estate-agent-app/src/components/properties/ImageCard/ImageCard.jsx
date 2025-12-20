export default function ImageCard({ property }) {
  const {
    type,
    bedrooms,
    price,
    tenure,
    description,
    location,
    images,
    added,
  } = property;

  const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
  const sentences = [...segmenter.segment(description)];
  return (
    <section className="card shadow-sm h-100 my-1">
      <div className="row g-0">
        <div className="col-md-4 border-end d-flex flex-column">
          <img
            src={images[0]}
            alt={`${type} in ${location}`}
            className="img-fluid rounded-start"
          />
          <div className="p-3 border-top">
            <p className="fw-bold fs-5 text-primary mb-0">£{price}</p>
          </div>
        </div>

        <div className="col-md-8 d-flex flex-column">
          <div className="card-body pb-0">
            <h4 className="card-title d-flex align-items-center gap-2 mb-3">
<i class="fa-solid fa-location-dot"></i>
              <span>{location}</span>
            </h4>

            <div className="d-flex flex-wrap gap-4 text-muted small mb-3">
              <span>
                <strong className="text-body">Type:</strong> {type}
              </span>
              <span>
                <strong className="text-body">Beds:</strong> {bedrooms}
              </span>
              <span>
                <strong className="text-body">Tenure:</strong> {tenure}
              </span>
            </div>

            <p className="card-text text-muted">{sentences.slice(0, 2).map(s => s.segment).join('')}</p>
          </div>

          <div className="card-footer bg-transparent border-0 mt-auto pt-0 pb-3">
            <small className="text-muted">
              Added: {added.day} {added.month} {added.year}
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
