import "./App.css";
import React from "react";
import Login from "./components/login.jsx";
import Main from "./components/main.jsx";
import Register from "./components/register.jsx";
import Cookies from "universal-cookie";
// import Footer from "./components/partials/footer.jsx";
import CreatePoll from "./components/createpoll";

function App() {
  const cookies = new Cookies();
  const [appState, setAppState] = React.useState(2);
  const [loginState, setLoginState] = React.useState(1);


  function logOut() {
    cookies.remove("loggedInUserEmail");
    setAppState(3);
    setLoginState(1);
  }

  return (
    <div className="App">
      {cookies.get("loggedInUserEmail") === undefined && loginState === 0 && (
        <Register setLoginState={setLoginState} setAppState={setAppState}/>
      )}

      {cookies.get("loggedInUserEmail") === undefined && loginState === 1 && (
        <Login setLoginState={setLoginState} setAppState={setAppState}/>
      )}

      {cookies.get("loggedInUserEmail") !== undefined && appState === 2 && (
        <Main setAppState={setAppState} logOut={logOut} />
      )}

      {cookies.get("loggedInUserEmail") !== undefined && appState === 3 && (
        <CreatePoll setAppState={setAppState} />
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default App;
