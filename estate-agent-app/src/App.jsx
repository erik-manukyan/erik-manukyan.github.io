import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import "./bootstrap.css";
import { Routes, Route } from "react-router-dom";
import RefinedSearch from "./components/search/refinedSearch/RefinedSearch";
import SearchBox from "./components/search/SearchBox";
import Gallery from "./components/properties/gallery/Gallery";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import { useFilters } from "./hooks/useFilters";
import PropertyDetails from "./components/properties/porpertyDetails/PropertyDetails";

function App() {
  const { showFilters } = useFilters();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
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
          <Route path="/properties/:id" element={<PropertyDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
