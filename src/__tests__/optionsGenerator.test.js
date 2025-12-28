// Tests for optionsGenerator helpers
// These are unit tests; they run quickly and validate deterministic logic.
import {
  getUniquePropertyTypes,
  getPriceBuckets,
} from "../components/search/optionsGenerator";

const sample = [
  { type: "Flat", price: 250000 },
  { type: "House", price: 520000 },
  { type: "Flat", price: 275000 },
  { type: "Bungalow", price: 350000 },
];

test("getUniquePropertyTypes returns sorted unique types", () => {
  const types = getUniquePropertyTypes(sample).map((t) => t.value);
  expect(types).toEqual(["Bungalow", "Flat", "House"]);
});

test("getPriceBuckets returns array of buckets with min/max", () => {
  const buckets = getPriceBuckets(sample, 3, 50000);
  expect(Array.isArray(buckets)).toBe(true);
  expect(buckets.length).toBeGreaterThan(0);
  expect(buckets[0]).toHaveProperty("min");
  expect(buckets[0]).toHaveProperty("max");
});
