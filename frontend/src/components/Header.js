import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Header = () => {
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
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Top Rated
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/">
                Action
              </Link>
              <Link className="dropdown-item" to="/">
                Sci Fi
              </Link>
              <Link className="dropdown-item" to="/">
                Adventorous
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;