import { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Navbar(props) {
  function showPollCreation() {
    props.setAppState(3);
  }

  const [navBarState, setNavBarState] = useState(0);
  const clickedStyle = { color: "#000000" };
  const noStyle = { color: "silver" };

  function navBarItemOnClick(state) {
    setNavBarState(state);
    if (state === 0 || state === 1) {
      props.setMainState(state);
    } else if (state === 2) {
      showPollCreation();
    } else {
      props.logOut();
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" id="brand-name" href="/">
        Voting System<p id="username">({cookies.get("loggedInUserEmail")})</p>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className=" active mynav-item">
            <p
              onClick={() => navBarItemOnClick(0)}
              style={navBarState === 0 ? clickedStyle : noStyle}
              className="nav-link navbar-buttons"
            >
              Home
            </p>
          </li>
          <li className="mynav-item">
            <p
              onClick={() => navBarItemOnClick(1)}
              style={navBarState === 1 ? clickedStyle : noStyle}
              className="nav-link navbar-buttons"
            >
              Search
            </p>
          </li>
          <li className="mynav-item">
            <p
              onClick={() => navBarItemOnClick(2)}
              style={navBarState === 2 ? clickedStyle : noStyle}
              className="nav-link navbar-buttons"
            >
              Create poll
            </p>
          </li>
          <li className="mynav-item">
            <p
              onClick={() => navBarItemOnClick(3)}
              style={navBarState === 3 ? clickedStyle : noStyle}
              className="nav-link navbar-buttons"
            >
              Logout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
