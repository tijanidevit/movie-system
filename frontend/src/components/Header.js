import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const ut = localStorage.getItem("userToken");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        <img src={Logo} width="40" height="40" alt="" /> Lacrose Movies
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav pull-right ">
          {(ut === undefined || ut === null) && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}

          {ut !== undefined && ut !== null && (
            <li className="nav-item">
              <Link className="nav-link" to="" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
