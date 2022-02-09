function Register() {
  return (
    <div>
      <label htmlFor="userNameForRegistration">Enter your name</label>
      <br></br>
      <input id="userNameForRegistration" />
      <br></br>
      <label htmlFor="userEmailForRegistration">Enter Email</label>
      <br></br>
      <input id="userEmailForRegistration" />
      <br></br>
      <label htmlFor="passwordForRegistration">Enter Password</label>
      <br></br>
      <input id="passwordForRegistration" />
      <br></br>
      <label htmlFor="confirmPasswordForRegistration">Confirm Password</label>
      <br></br>
      <input id="confirmPasswordForRegistration" />
      <br></br>
      <button id="registerButton">Register</button>
    </div>
  );
}

export default Register;
