import "./App.css";
import React, { useState } from "react";
import Header from "./components/partials/header.jsx";
import Login from "./components/login.jsx";
import Main from "./components/main.jsx";
import Register from "./components/register.jsx";
import Footer from "./components/partials/footer.jsx";
import CreatePoll from "./components/createpoll";

function App() {
  const [appState, setAppState] = React.useState(1);
  const [username, setUserName] = useState("-1");

  return (
    <div className="App">

      <Header setAppState={setAppState} />

      {appState === 0 && (
        <Register username={username} setAppState={setAppState} />
      )}

      {appState === 1 && (
        <Login setUserName={setUserName} setAppState={setAppState} />
      )}

      {appState === 2 && <Main />}

      {appState === 3 && (
        <CreatePoll username={username} setAppState={setAppState} />
      )}

      <Footer />
    </div>
  );
}

export default App;
