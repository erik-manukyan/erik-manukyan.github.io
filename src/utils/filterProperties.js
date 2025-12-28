// filterProperties.js
// A small, well-documented helper that encapsulates the property filtering logic
// so it can be unit-tested independently of the `Gallery` component.

const MONTHS = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

/**
 * Filter a list of properties according to the provided filters.
 * All inputs are defensive — missing fields are tolerated.
 * @param {Array} properties
 * @param {Object} filters
 * @returns {Array} filtered properties
 */
export function filterProperties(properties = [], filters = {}) {
  return properties.filter((property) => {
    // Location substring match (case-insensitive)
    const qLoc = (filters.location || "").toLowerCase().trim();
    if (qLoc && !property.location?.toLowerCase().includes(qLoc)) return false;

    // Property type exact match
    if (
      filters.propertyType &&
      filters.propertyType.trim() &&
      property.type !== filters.propertyType
    ) {
      return false;
    }

    // Price range check
    const minP = filters.minPrice ? Number(filters.minPrice) : null;
    const maxP = filters.maxPrice ? Number(filters.maxPrice) : null;
    if (minP !== null && property.price < minP) return false;
    if (maxP !== null && property.price > maxP) return false;

    // Bedrooms range
    const minB = filters.minBedrooms ? Number(filters.minBedrooms) : null;
    const maxB = filters.maxBedrooms ? Number(filters.maxBedrooms) : null;
    if (minB !== null && property.bedrooms < minB) return false;
    if (maxB !== null && property.bedrooms > maxB) return false;

    // Postcode area (substring match on location)
    const qPost = (filters.postcodeArea || "").toLowerCase().trim();
    if (qPost && !property.location?.toLowerCase().includes(qPost))
      return false;

    // Date added filter (properties added within N days)
    if (filters.dateAdded) {
      const added = property.added;
      if (!added || !added.month || !added.day || !added.year) return false;
      const monthIndex = MONTHS[added.month];
      if (typeof monthIndex !== "number") return false;
      const propertyDate = new Date(added.year, monthIndex, added.day);
      const today = new Date();
      const daysDifference = Math.floor(
        (today - propertyDate) / (1000 * 60 * 60 * 24)
      );
      if (daysDifference > Number(filters.dateAdded)) return false;
    }

    return true;
  });
}
