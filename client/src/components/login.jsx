import Cookies from "universal-cookie";
const cookies=new Cookies();
function Login(props) {
  function showRegisterPage() {
    props.setLoginState(0);
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
          cookies.set("loggedInUserEmail",email);
          props.setLoginState(0);
          // console.log("Loggin in user: "+props.username);
        } else {
          alert(data);
        }
      });
  }

  return (
    <div className="card reg-log-card mx-auto">
      <div className="card-body">
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
        <button className="reg-log-button" onClick={loginUser}>Login</button>
        <br /><br />
        <p className="reg-log-link" onClick={showRegisterPage}>
          Want to register?
        </p>
      </div>
    </div>
  );
}

export default Login;
