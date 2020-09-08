import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { addUser } from "../service/AddUserToDb";

export default function RegisterUser() {
  const { register, errors, handleSubmit, watch } = useForm({});

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (value) => {
    let user = value;
    addUser(user);
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
        <div className="error">Your must enter your email address.</div>
      )}

      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
}
