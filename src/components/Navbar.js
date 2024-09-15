// Navbar.js
import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../components/context/SearchContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/search");
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              HOME
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="navbar-brand" to="/">
                    Crud App
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
