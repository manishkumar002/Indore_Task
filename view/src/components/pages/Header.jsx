import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  let token = JSON.parse(window.localStorage.getItem("token"));
  let navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <b style={{ color: "#ffc801" }}>Bazar Mart</b>
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
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/addproduct">
                      Add Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/viewproduct">
                      View Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" onClick={logout} aria-current="page" to="/login">
                      Log Out
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
