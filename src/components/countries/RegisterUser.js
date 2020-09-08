import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../../style/RegisterForm.css";
import axios from "axios";

export default function RegisterUser() {
  const { register, errors, handleSubmit, watch, formState } = useForm({});

  const [registrationMessage, setRegistrationMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const REGISTER_API = "http://localhost:8080/api/v1/auth/register";

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (user) => {
    axios
      .post(REGISTER_API, user)
      .then((res) => {
        if (res.status === 200) {
          setIsSubmitted(true);
          setRegistrationMessage(res.data);
        }
      })
      .catch((err) => {
        setRegistrationMessage(err.response.data);
      });
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={(e) => e.preventDefault}>
        <label className="d-inline">Email: </label>
        <input
          type="text"
          name="email"
          ref={register({
            required: true,
          })}
          placeholder="Email"
        />
        {errors.email && errors.email.type === "required" && (
          <p>Your must enter your email address.</p>
        )}
        <label className="d-inline">First Name: </label>
        <input
          type="text"
          name="firstName"
          ref={register({
            required: true,
          })}
          placeholder="First Name"
        />
        {errors.firstName && errors.firstName.type === "required" && (
          <p>Your must enter your first name.</p>
        )}
        <label className="d-inline">Last Name: </label>
        <input
          type="text"
          name="lastName"
          ref={register({
            required: true,
          })}
          placeholder="Last Name"
        />
        {errors.lastName && errors.lastName.type === "required" && (
          <p>Your must enter your last name.</p>
        )}
        <label className="d-inline">Phone No. : </label>
        <input
          type="text"
          name="phoneNumber"
          ref={register({
            required: true,
          })}
          placeholder="Phone Number"
        />
        {errors.lastName && errors.lastName.type === "required" && (
          <p>Your must enter your last name.</p>
        )}

        <label className="d-inline">Password: </label>
        <input
          type="text"
          name="password"
          placeholder="Your password"
          ref={register({
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label className="d-inline">Confirm password</label>
        <input
          name="confirmPassword"
          type="text"
          placeholder="Confirm password"
          ref={register({
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <label className="d-inline">Register as:</label>
        <select
          name="userTypeID"
          ref={register({
            required: true,
          })}
          className="form-control  d-inline-block"
        >
          <option value="3">Host</option>
          <option value="4">Guest</option>
        </select>
        <span className={isSubmitted ? "text-success" : "text-danger"}>
          {registrationMessage}
        </span>
        <input type="submit" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
}
