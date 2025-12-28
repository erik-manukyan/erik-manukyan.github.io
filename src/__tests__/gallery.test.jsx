// Component test for Gallery (moved to .jsx extension)
import React from "react"; // ensure JSX transforms work in the test environment
import { render } from "@testing-library/react";
import Gallery from "../components/properties/gallery/Gallery";
import * as useProps from "../hooks/useProperties";
import * as useFilters from "../hooks/useFilters";

// Mock the useProperties hook to return loading state
// Vitest uses `vi` as the test runtime mocking API (compatible with Jest's API).
vi.spyOn(useProps, "useProperties").mockImplementation(() => ({
  properties: [],
  loading: true,
  error: null,
}));
// Mock useFilters so the Gallery can render outside of the real provider
vi.spyOn(useFilters, "useFilters").mockImplementation(() => ({ filters: {} }));

test("shows skeleton when loading", () => {
  const { container } = render(<Gallery />);
  // the skeleton-image class should be present in DOM when loading
  const skeletonImages = container.querySelectorAll(".skeleton-image");
  expect(skeletonImages.length).toBeGreaterThan(0);
});
