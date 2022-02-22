function Login(props) {
  function showRegisterPage() {
    props.setAppState(0);
  }

  function loginUser() {
    const password = document.getElementById("loginPassword").value;
    const email = document.getElementById("loginEmail").value;
    fetch("/loginUser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "Login successful") {
          props.setUserName(email);
          // console.log("Loggin in user: "+props.username);
          props.setAppState(2);
        } else {
          alert(data);
        }
      });
  }

  return (
    <div>
      <label htmlFor="loginEmail">Enter email</label>
      <br></br>
      <input id="loginEmail" />
      <br></br>
      <br></br>
      <label htmlFor="loginPassword">Enter Password</label>
      <br></br>
      <input id="loginPassword" />
      <br></br>
      <br></br>
      <p onClick={showRegisterPage} style={{ color: "blue" }}>
        Want to register?
      </p>
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;
