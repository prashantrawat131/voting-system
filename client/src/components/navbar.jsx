import Cookies from "universal-cookie";
const cookies=new Cookies();

function Navbar(props) {
  function showPollCreation() {
    props.setAppState(3);
  }

  function logOut(){
    cookies.remove("loggedInUserEmail");
    props.setAppState(0);
  }

  return (
    <div className="container ">
      <div className="row">
        <div className="col"><h4 id="app-name-heading">Voting System</h4></div>
        <div className="col">
          <img
            onClick={() => props.setMainState(0)}
            className="navbar-buttons"
            src="home.svg"
            alt="home feed"
          />
        </div>
        <div className="col">
          <img
            onClick={() => props.setMainState(1)}
            className="navbar-buttons"
            src="search.svg"
            alt="home feed"
          />
        </div>
        <div className="col">
          <button className="my-buttons" onClick={showPollCreation}>Create poll</button>
        </div>

        <div className="col">
          <button className="my-buttons" onClick={logOut}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
