import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";

const API_URI = env.SERVER_API_URL;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // If POST request for Signup is successful, redirects to homepage
    // Otherwise, sets the error message in the state

    console.log("API_URI", API_URI)

    axios
      .post(`${API_URI}/auth/signup`, requestBody)
      .then((response) => props.history.push("/"))
      //.then((response) => props.history.push("/login"))
      .catch((error) => {
        const errorDescription = `There's been an error: ${error}`
        setErrorMessage(errorDescription)
      });
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSignupSubmit} className="form">

        <div className="fields">
          <label>Your firstname:</label>
          <input type="text" name="name" value={name} onChange={handleName} />
        </div>

        <div className="fields">
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={handleEmail} />
        </div>

        <div className="fields">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>

    </div>
  );
}

export default SignupPage;
