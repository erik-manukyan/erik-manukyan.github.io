// Integration-style test for useProperties hook (moved to .jsx)
import React from "react"; // ensure JSX works inside the test
import { render, screen, waitFor } from "@testing-library/react";
import { useProperties } from "../hooks/useProperties";

function TestComp() {
  const { properties, loading } = useProperties();
  return <div>{loading ? "loading" : properties.length}</div>;
}

beforeEach(() => {
  // Mock global.fetch to return a simple payload using Vitest's vi.fn mock helper
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ properties: [{ id: "x" }] }),
    })
  );
});

afterEach(() => {
  delete global.fetch;
});

test("useProperties switches from loading to data", async () => {
  render(<TestComp />);
  expect(screen.getByText("loading")).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText("1")).toBeInTheDocument());
});
