import MiniSearch from "../search/MiniSearch";
import Gallery from "../properties/Gallery";
import Cart from "../cart-favourites/Cart";
import Favourites from "../cart-favourites/Favourites";

export default function SearchResultsPage() {
  return (
    <div>
      {/* MiniSearch - Full width top */}
      <MiniSearch />

      {/* Main Content - Gallery Left, Cart & Favourites Right */}
      <div className="container-fluid">
        <div className="row">
          {/* Left Side - Gallery */}
          <div className="col-md-12">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
}
