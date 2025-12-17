import Navbar from "./components/layout/Navbar";
import "./bootstrap.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import RefinedSearch from "./components/search/RefinedSearch";
import SearchBox from "./components/search/SearchBox";
import Gallery from "./components/properties/Gallery";
import SearchResultsPage from "./components/pages/SearchResultsPage";

function App() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!showFilters ? (
                <SearchBox setShowFilters={setShowFilters} />
              ) : (
                <>
                  <RefinedSearch />
                  <Gallery />
                </>
              )}
            </>
          }
        />
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
