import { Link } from "react-router-dom";
import { useFilters } from "../../../hooks/useFilters";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { setShowFilters, resetFilters } = useFilters();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        // always show near the top
        if (currentY <= 50) {
          setVisible(true);
        } else if (currentY < lastY.current) {
          // scrolled up
          setVisible(true);
        } else {
          // scrolled down
          setVisible(false);
        }
        lastY.current = currentY;
        ticking.current = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`navbar sticky-top navbar-light navbar-smooth justify-content-between shadow-lg ${
        visible ? "navbar-visible" : "navbar-hidden"
      }`}
      aria-hidden={!visible}
    >
      <Link
        className="navbar-brand"
        to="/"
        onClick={() => {
          setShowFilters?.(false);
          resetFilters();
        }}
      >
        <img
          src="/images/main-icon.png"
          className="d-inline-block align-top px-2 rounded"
          alt="Main Logo of the website"
          height={80}
        />
      </Link>

      <ul className="navbar-nav d-flex gap-3 flex-row px-4">
        <li className="nav-item">
          <a
            className="nav-link d-flex align-items-center gap-2"
            href="https://www.linkedin.com/in/erik-manukyan02/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Erik's LinkedIn (opens in new tab)"
          >
            <i className="fa-brands fa-linkedin"></i>
            <span className="d-none d-md-inline">LinkedIn</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link d-flex align-items-center gap-2"
            href="https://github.com/erik-manukyan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Erik's GitHub (opens in new tab)"
          >
            <i className="fa-brands fa-github"></i>
            <span className="d-none d-md-inline">GitHub</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
