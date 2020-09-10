import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../../style/RegisterForm.css";
import TimeField from "react-simple-timefield";

import "react-datepicker/dist/react-datepicker.css";

export default function AddRental() {
  const { register, errors, handleSubmit } = useForm({});

  return (
    <div className="container">
      <form className="form-signin" onSubmit={(e) => e.preventDefault}>
        <label className="d-inline">Offer Name </label>
        <input
          type="text"
          name="name"
          ref={register({
            required: true,
          })}
          placeholder="Offer Name"
        />
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          name="description"
          ref={register({
            required: true,
          })}
          rows="3"
        ></textarea>
        <label>Choose Check-In Time</label>
        <TimeField
          className="mt-3 text-center ml-5"
          style={{
            border: "2px solid #666",
            fontSize: 12,
            width: 160,

            padding: "5px 8px",
            color: "#333",
            borderRadius: 14,
          }}
        />{" "}
        <label>Choose Check-Out Time</label>
        <TimeField
          className="mt-3 text-center ml-5"
          style={{
            border: "2px solid #666",
            fontSize: 12,
            width: 160,

            padding: "5px 8px",
            color: "#333",
            borderRadius: 14,
          }}
        />{" "}
        <input type="submit" />
      </form>
    </div>
  );
}
