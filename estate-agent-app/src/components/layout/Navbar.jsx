import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between shadow-lg">
      <Link className="navbar-brand" to="/">
        <img
          src="./images/main-icon.png"
          className="d-inline-block align-top px-2 rounded"
          alt="Main Logo of the website"
          height={80}
        />
      </Link>
      <ul className="navbar-nav d-flex gap-3 flex-row px-4">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Buy
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/rent">
            Rent
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/prices">
            House Prices
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/agents">
            Find Agent
          </Link>
        </li>
      </ul>
    </nav>
  );
}
