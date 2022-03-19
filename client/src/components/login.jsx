import Cookies from "universal-cookie";
const cookies = new Cookies();
function Login(props) {
  function showRegisterPage() {
    props.setLoginState(0);
  }

  function loginUser() {
    const password = document.getElementById("loginPassword").value;
    const email = document.getElementById("loginEmail").value;

    if (!password || !email) {
      alert("Please fill all the fields");
      return;
    }

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
          cookies.set("loggedInUserEmail", email);
          props.setLoginState(0);
          props.setAppState(2);
          // console.log("Loggin in user: "+props.username);
        } else {
          alert(data);
        }
      });
  }

  return (
    <div className="card reg-log-card mx-auto">
      <div className="card-body">
        <label htmlFor="loginEmail">Email</label>
        <br></br>
        <input className="form-control" id="loginEmail" />
        <br></br>
        <label htmlFor="loginPassword">Password</label>
        <br></br>
        <input className="form-control" id="loginPassword" />
        <br></br>

        <div className="right-ended-div">
          <button className="btn btn-warning" onClick={loginUser}>
            Login
          </button>
          <br /><br />
          <p className="reg-log-link" onClick={showRegisterPage}>
            Want to register?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
