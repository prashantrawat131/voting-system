import "./App.css";
import React from "react";
import Header from "./components/partials/header.jsx";
import Login from "./components/login.jsx";
import Main from "./components/main.jsx";
import Register from "./components/register.jsx";
import Footer from "./components/partials/footer.jsx";

function App() {
  const [appState, setAppState] = React.useState(0);

  return (
    <div className="App">
      <Header />

      {/* <label>{rData}</label> */}

      {appState === 0 && <Register setAppState={setAppState} />}

      {appState === 1 && <Login setAppState={setAppState} />}

      {appState === 2 && <Main />}

      <Footer />
    </div>
  );
}

export default App;
