import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { sendEmail } from "../../apiCalls";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const isFree = useRef();
  const isVip = useRef();
  const isAdmin = useRef();
  const code = useRef();

  let paddedCode = "";

  const sendEmailVerification = async (e) => {
    const randomCode = Math.floor(Math.random() * 1000000);
    paddedCode = randomCode.toString().padStart(6, "0");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.current.value)) {
      sendEmail(email.current.value, paddedCode);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else if (code.current.value !== paddedCode) {
      code.current.setCustomValidity("Email verification code does not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        isFree: isFree.current.checked,
        isVip: isVip.current.checked,
        isAdmin: isAdmin.current.checked,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickLogin = async (e) => {
    history.push("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ZodiacHolic</h3>
          <span className="loginDesc">
            Know your daily horoscopes and connect with friends around world!
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <input
              type="text"
              placeholder="Enter verification code"
              className="loginInput"
              ref={code}
            />
            <button onClick={sendEmailVerification} className="sendEmailButton">
              Send Code
            </button>
            <div>
              <input
                type="radio"
                id="free_user"
                name="user_role"
                value="free"
                ref={isFree}
                defaultChecked
              />
              <label htmlFor="free_user">Free User </label>
              <input
                type="radio"
                id="vip_user"
                name="user_role"
                value="vip"
                ref={isVip}
              />
              <label htmlFor="vip_user">VIP User </label>
              <input
                type="radio"
                id="admin"
                name="user_role"
                value="admin"
                ref={isAdmin}
              />
              <label htmlFor="admin">Administer</label>
            </div>
            <br />
            <button className="loginButton" onClick={handleClick}>
              Sign Up
            </button>
            <button onClick={handleClickLogin} className="loginRegisterButton">
              Go to Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
