import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import "../../style/RegisterForm.css";
import axios from "axios";
import swal from "sweetalert";
import NotFound from "./NotFound";

export default function Login() {
  const { register, handleSubmit } = useForm({});
  const [logInMsj, setLogInMsj] = useState("");
  const [isLoggedIn, setIsLogged] = useState(false);
  const [hasError, setHasError] = useState(false);

  const history = useHistory();

  const LOGIN_API = "http://localhost:8080/api/v1/auth/login";
  const USER_API = "http://localhost:8080/api/v1/auth/get-user/";

  const onSubmit = (user) => {
    axios
      .post(LOGIN_API, user)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsLogged(true);
          setLogInMsj("Success");
          swal({
            title: "Good job!",
            text: "You are logged in!",
            icon: "success",
            button: { text: "Home", className: "btn_1" },
          }).then(function () {
            window.location = "/";
          });
          window.sessionStorage.setItem("userEmail", user.email);
          if (window.sessionStorage.getItem("userEmail") !== undefined) {
            const userEmail = window.sessionStorage.getItem("userEmail");
            axios.get(USER_API + userEmail).then((res) => {
              console.log(res);

              window.sessionStorage.setItem("userId", res.data.id);
              window.sessionStorage.setItem("firstName", res.data.firstName);
              window.sessionStorage.setItem("userType", res.data.type.name);
            });
          }

          // setTimeout(() => {
          //   history.push("/");
          // }, 1500);
        }
      })
      .catch((err) => {
        if (err.response === undefined) {
          console.log(err.response.data);
          setHasError(true);
        } else {
          if (err.response.data === "Invalid credentials") {
            setLogInMsj(err.response.data);
          }
        }
      });
  };

  useEffect(() => {}, [isLoggedIn]);

  if (hasError) {
    return <NotFound />;
  }

  return (
    <div className="container loginForm ">
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

        <input
          type="submit"
          className="btn_1"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
}
