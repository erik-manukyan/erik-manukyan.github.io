// Test setup file: installs helpful DOM matchers and polyfills used across tests.
// Keep this small and idempotent — runs before each test file.
import "@testing-library/jest-dom/extend-expect"; // adds matchers like toBeInTheDocument
import "whatwg-fetch"; // fetch polyfill for jsdom so hooks relying on fetch work in tests
