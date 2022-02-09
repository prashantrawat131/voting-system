import "./App.css";
import React from "react";
import Header from "./components/partials/header.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Footer from "./components/partials/footer.jsx";

function App() {
  const [rData, setData] = React.useState("none");
  const [appState, setAppState] = React.useState(0);

    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));

  return (
    <div className="App">
      <Header />

      <label>{rData}</label>

      {appState === 0 && <Register />}

      {appState === 1 && <Login />}

      <Footer />
    </div>
  );
}

export default App;
