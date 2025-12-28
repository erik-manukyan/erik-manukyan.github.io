// Unit tests for the filterProperties helper — re-added after accidental deletion.
// These tests verify basic combinations of filter criteria work as expected.
import { filterProperties } from "../utils/filterProperties";

const props = [
  {
    id: "a",
    type: "Flat",
    bedrooms: 2,
    price: 250000,
    location: "B1",
    added: { month: "December", day: 1, year: 2025 },
  },
  {
    id: "b",
    type: "House",
    bedrooms: 4,
    price: 750000,
    location: "BR5",
    added: { month: "November", day: 1, year: 2025 },
  },
];

test("filters by location substring", () => {
  const res = filterProperties(props, { location: "B1" });
  expect(res).toHaveLength(1);
  expect(res[0].id).toBe("a");
});

test("filters by min and max price", () => {
  const res = filterProperties(props, {
    minPrice: "200000",
    maxPrice: "300000",
  });
  expect(res).toHaveLength(1);
  expect(res[0].id).toBe("a");
});

test("filters by bedrooms", () => {
  const res = filterProperties(props, { minBedrooms: "3" });
  expect(res).toHaveLength(1);
  expect(res[0].id).toBe("b");
});
