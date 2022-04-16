import Cookies from "universal-cookie";
import validator from "validator";

const cookies = new Cookies();

function Register(props) {
  function registerUser() {
    const userName = document.getElementById("userNameForRegistration").value;
    const email = document.getElementById("userEmailForRegistration").value;
    const password = document.getElementById("passwordForRegistration").value;
    const confirmPassword = document.getElementById(
      "confirmPasswordForRegistration"
    ).value;

    console.log("User name: " + userName);
    // alert(userName+"\t"+email+"\t"+password);

    if (!userName || !email || !password || !confirmPassword) {
      alert("PLease fill all the fields");
      return;
    }

    if (!validator.isEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (confirmPassword !== password) {
      alert("Confirm password not matching. Please retry");
      return;
    }

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
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Registered successfully") {
          cookies.set("loggedInUserEmail", email);
          props.setLoginState(1);
          props.setAppState(2);
        } else {
          alert(data.message);
        }
      });
  }

  function showLoginPage() {
    props.setLoginState(1);
  }

  return (
    <div class="card reg-log-card mx-auto">
      <div class="card-body">
        <label htmlFor="userNameForRegistration">Enter your name</label>
        <br></br>
        <input className="form-control" id="userNameForRegistration" />
        <br></br>
        <label htmlFor="userEmailForRegistration">Enter Email</label>
        <br></br>
        <input className="form-control" id="userEmailForRegistration" />
        <br></br>
        <label htmlFor="passwordForRegistration">Enter Password</label>
        <br></br>
        <input className="form-control" id="passwordForRegistration" />
        <br></br>
        <label htmlFor="confirmPasswordForRegistration">Confirm Password</label>
        <br></br>
        <input className="form-control" id="confirmPasswordForRegistration" />
        <br></br>

        <div className="right-ended-div">
          <button
            className="btn btn-warning"
            onClick={registerUser}
            id="registerButton"
          >
            Register
          </button>
          <br />
          <br />
          <p className="reg-log-link" onClick={showLoginPage}>
            Already a user. Wanna Login?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
