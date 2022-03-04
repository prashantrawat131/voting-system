import Cookies from "universal-cookie";

const cookies=new Cookies();

function Register(props) {
  function registerUser() {
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
      .then((data) => {
        if(data==="Registered successfully"){
          cookies.set("loggedInUserEmail",email);
        }else{
          alert(data);
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
        <input id="userNameForRegistration" />
        <br></br>
        <br></br>
        <label htmlFor="userEmailForRegistration">Enter Email</label>
        <br></br>
        <input id="userEmailForRegistration" />
        <br></br>
        <br></br>
        <label htmlFor="passwordForRegistration">Enter Password</label>
        <br></br>
        <input id="passwordForRegistration" />
        <br></br>
        <br></br>
        <label htmlFor="confirmPasswordForRegistration">Confirm Password</label>
        <br></br>
        <input id="confirmPasswordForRegistration" />
        <br></br>
        <br></br>
        <button className="reg-log-button" onClick={registerUser} id="registerButton">
          Register
        </button>
        <br></br>
        <br></br>
        <p className="reg-log-link" onClick={showLoginPage}>
          Already a user. Wanna Login?
        </p>
      </div>
    </div>
  );
}

export default Register;
