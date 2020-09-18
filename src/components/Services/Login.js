import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import "../../style/RegisterForm.css";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm({});
  const [logInMsj, setLogInMsj] = useState("");
  const [isLoggedIn, setIsLogged] = useState(false);
  const history = useHistory();

  const LOGIN_API = "http://localhost:8080/api/v1/auth/login";

  const onSubmit = (user) => {
    axios
      .post(LOGIN_API, user)
      .then((res) => {
        if (res.status === 200) {
          setIsLogged(true);
          setLogInMsj(res.data);
          window.sessionStorage.setItem("login", user.email);
          setTimeout(() => {
            history.push("/");
          }, 1500);
        }
      })
      .catch((err) => {
        setLogInMsj(err.response.data);
      });
  };

  return (
    <div className="container">
      <form
        className="form-signin"
        action="/j_spring_security_check"
        // onSubmit={(e) => e.preventDefault}
      >
        <label>Email: </label>
        <input
          type="text"
          name="email"
          ref={register({
            required: true,
          })}
          placeholder="Email"
        />
        <label>Password </label>
        <input
          type="password"
          name="password"
          ref={register({
            required: true,
          })}
          placeholder="Password"
        />
        <span className={isLoggedIn ? "text-success" : "text-danger"}>
          {logInMsj}
        </span>
        <label>Remember Me</label>
        <input type="checkbox" name="remember-me" />
        <input type="submit" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
}