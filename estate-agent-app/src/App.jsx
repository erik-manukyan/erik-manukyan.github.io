import Navbar from "./components/layout/Navbar";
import "./bootstrap.css";
import { Routes, Route } from "react-router-dom";
import RefinedSearch from "./components/search/RefinedSearch";
import SearchBox from "./components/search/SearchBox";
import Gallery from "./components/properties/Gallery";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import { useFilters } from "./hooks/useFilters";

function App() {
  const { showFilters } = useFilters();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!showFilters ? (
                <SearchBox />
              ) : (
                <>
                  <RefinedSearch />
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
