// src/components/Header.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ cartCount = 0, searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleNavClose = () => setIsNavCollapsed(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
      handleNavClose();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-3 px-md-4">
        {/* Brand Logo */}
        <Link 
          className="navbar-brand d-flex align-items-center gap-2 me-3" 
          to="/"
          onClick={handleNavClose}
        >
          <img
            src="https://img.freepik.com/premium-vector/grilled-chicken_78118-141.jpg"
            alt="Logo"
            width="40"
            height="40"
            className="d-none d-sm-block"
          />
          <strong>
            <span style={{ color: "#d61e1e" }} className="brand-text">
              DELICIOUS FOOD
            </span>
          </strong>
        </Link>

        {/* Cart icon for mobile */}
        <Link 
          className="nav-link d-lg-none me-3 position-relative" 
          to="/cart"
          onClick={handleNavClose}
        >
          🛒
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          {/* Navigation Links - positioned first on mobile */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" onClick={handleNavClose}>
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item" onClick={handleNavClose}>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Search form */}
          <form
            className="d-flex my-3 my-lg-0 mx-auto mx-lg-3 w-50 w-lg-50"
            onSubmit={handleSearchSubmit}
          >
            <div className="input-group">
              <input
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                aria-label="Search food"
              />
              <button className="btn btn-outline-primary ps-3" type="submit">
                <span className="d-none d-md-inline ">Search</span>
                <span className="d-md-none">🔍</span>
              </button>
            </div>
          </form>

          {/* Cart for desktop */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-none d-lg-block position-relative" onClick={handleNavClose}>
              <Link className="nav-link" to="/cart">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}