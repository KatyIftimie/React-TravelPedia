import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import "../../style/RegisterForm.css";
import { addUser } from "../service/AddUserToDb";

export default function RegisterUser() {
  const { register, errors, handleSubmit, watch } = useForm({});

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (value) => {
    let user = value;
    addUser(user);
    console.log(value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault}>
      <label>Email: </label>
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
      <label>First Name: </label>
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
      <label>Last Name: </label>
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


      <label>Password: </label>
      <input
        type="text"
        name="password"
        placeholder="Your password"
        ref={register({
          required: "You must specify a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Confirm password</label>
      <input
        name="confirmPassword"
        type="text"
        placeholder="Confirm password"
        ref={register({
          validate: value =>
            value === password.current || "The passwords do not match"
        })}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label>Register as:</label>
      <select
        name="userType"
        ref={register({
          required: true,
        })}
      >
        <option value="HOST">Host</option>
        <option value="ADMIN">Admin</option>
        <option value="GUEST">Guest</option>
      </select>



      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
}
