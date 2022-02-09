import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

document
  .getElementById("registerButton")
  .addEventListener("click", function () {
    const userName = document.getElementById("userNameForRegistration").value;
    const email = document.getElementById("userEmailForRegistration").value;
    const password = document.getElementById("passwordForRegistration").value;

    console.log("User name: " + userName);
    // alert(userName+"\t"+email+"\t"+password);

    fetch("/registerUser", {
      method: "POST",
      body: JSON.stringify({
        name: userName,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((data) => console.log("Data:" + data));
  });
