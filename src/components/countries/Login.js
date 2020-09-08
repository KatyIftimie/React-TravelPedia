import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../style/RegisterForm.css";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm({});
  const [logInMsj, setLogInMsj] = useState("");
  const [isLoggedIn, setIsLogged] = useState(false);
  const LOGIN_API = "http://localhost:8080/api/v1/auth/login";

  const onSubmit = (user) => {
    axios
      .post(LOGIN_API, user)
      .then((res) => {
        if (res.status === 200) {
          setIsLogged(true);
          setLogInMsj(res.data);
        }
      })
      .catch((err) => {
        setLogInMsj(err.response.data);
      });
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={(e) => e.preventDefault}>
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
          type="text"
          name="password"
          ref={register({
            required: true,
          })}
          placeholder="Password"
        />
        <span className={isLoggedIn ? "text-success" : "text-danger"}>
          {logInMsj}
        </span>
        <input type="submit" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
}
