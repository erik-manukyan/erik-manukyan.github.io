export default function ImageCard({ property }) {
  const {
    type,
    bedrooms,
    price,
    tenure,
    description,
    location,
    picture,
    added,
  } = property;

  return (
    <section className="card ">
      <img
        src={picture}
        alt={type + " " + location}
        className="card-image-top"
        height={100}
        width={100}
      />
      <div className="card-header">
        <h4>
          <span className="material-symbols-outlined">location_on</span>
          {location}
        </h4>
      </div>
      <h4>Bedrooms: {bedrooms}</h4>
      <h4>Price: {price}</h4>
      <h4>Tenure: {tenure}</h4>
      <h5>Description: {description}</h5>
      <h4>
        Added: {added.day} {added.month}, {added.year}
      </h4>
      <button>Add to Favourites</button>
    </section>
  );
}
