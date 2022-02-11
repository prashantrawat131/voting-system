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
      .then((data) => console.log("Data:" + data));
  }

  function showLoginPage(){
    props.setAppState(1);
  }

  return (
    <div>
      <label htmlFor="userNameForRegistration">Enter your name</label>
      <br></br>
      <input id="userNameForRegistration" />
      <br></br><br></br>
      <label htmlFor="userEmailForRegistration">Enter Email</label>
      <br></br>
      <input id="userEmailForRegistration" />
      <br></br><br></br>
      <label htmlFor="passwordForRegistration">Enter Password</label>
      <br></br>
      <input id="passwordForRegistration" />
      <br></br><br></br>
      <label htmlFor="confirmPasswordForRegistration">Confirm Password</label>
      <br></br>
      <input id="confirmPasswordForRegistration" />
      <br></br><br></br>
      <button onClick={registerUser} id="registerButton">Register</button>
      <br></br><br></br>
      <p style={{color:"blue"}} onClick={showLoginPage}>Already a user. Wanna Login?</p>
    </div>
  );
}

export default Register;
