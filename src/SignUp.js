import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserToasts, { showToast } from "./UserToasts";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevent form from full page reload

    const loginSuccess = true;

    if (loginSuccess) {
      showToast("Account Creation Successfull!", "success", {
        style: { backgroundColor: "#F9F7F7", color: "#1d3557" },
      });
      console.log("Name: ", name);
      console.log("Email: ", email);
      console.log("Password: ", password);
      console.log("Remember Me: ", rememberMe);

      setName("");
      setEmail("");
      setPassword("");
      setRememberMe(false);

      setTimeout(() => {
        navigate("/Dashboard", { state: { name } });
      }, 1000);
    } else {
      showToast("Login Failed! Please check your credentials!", "error");
    }
  };

  return (
    <>
      <UserToasts />
      <div
        className="vh-100 vw-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#112D4E" }}
      >
        <div
          className="p-5 rounded shadow w-25"
          style={{ backgroundColor: "#F9F7F7" }}
        >
          {/* <img
            src=""
            alt="Logo"
            className="mb-4 mx-auto img-fluid"
            style={{ maxWidth: "100px" }}
          /> */}
          <h2 className="text-center mb-4">FinSync: Your Money, In Sync!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="name"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete
              ></input>
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete
              ></input>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
            <div className="mb-3 form-check d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              ></input>
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary w-100 mb-3 text-center"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
