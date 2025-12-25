import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer bg-dark text-light py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="small">
          © {new Date().getFullYear()} Erik Manukyan — Built with Bootstrap,
          React and Vite
        </div>

        <div className="d-flex gap-3 align-items-center">
          <a
            className="footer-link d-flex align-items-center gap-2"
            href="https://www.linkedin.com/in/erik-manukyan02/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Erik's LinkedIn (opens in a new tab)"
          >
            <i className="fa-brands fa-linkedin fa-lg" aria-hidden="true"></i>
            <span className="visually-hidden">LinkedIn</span>
          </a>

          <a
            className="footer-link d-flex align-items-center gap-2"
            href="https://github.com/erik-manukyan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Erik's GitHub (opens in a new tab)"
          >
            <i className="fa-brands fa-github fa-lg" aria-hidden="true"></i>
            <span className="visually-hidden">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
