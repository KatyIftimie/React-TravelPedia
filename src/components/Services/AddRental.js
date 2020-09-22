import React from "react";
import { useForm } from "react-hook-form";

import "../../style/RegisterForm.css";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function AddRental() {
  const { register, errors, handleSubmit } = useForm({});

  let axiosConfig = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  const onSubmit = (rental) => {
    console.log(rental);
    axios
      .post("http://localhost:8080/api/v1/rentals", rental, axiosConfig)
      .then((res) => {
        console.log("da");
      });
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={(e) => e.preventDefault}>
        <div className="modal-header">
          <h5 className="modal-title">Add New Rental</h5>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="col mb-3">
              <label htmlFor="name"> Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rental Name"
                name="name"
                ref={register({
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <textarea
                type="text"
                className="form-control "
                placeholder="Enter Description"
                name="description"
                rows="4"
                ref={register}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <label> Check-In </label>&nbsp;&nbsp;
              <input
                type="datetime-local"
                my-date-format="DD/MM/YYYY, hh:mm:ss"
                step="1"
                name="checkInTime"
                placeholder="Time"
                ref={register}
              />
              <label> Check-Out </label>&nbsp;
              <input
                type="datetime-local"
                my-date-format="DD/MM/YYYY, hh:mm:ss"
                step="1"
                name="checkOutTime"
                placeholder="Time"
                ref={register}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <input
                type="file"
                accept="image/jpeg"
                multiple
                name="images"
                ref={register}
              />
            </div>
          </div>
          {/* address */}

          <div className="form-row">
            <div className="col mb-3">
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
              />
            </div>
            <div className="col mb-3">
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                ref={register}
              />
            </div>

            <div className="col mb-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                ref={register}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col mb-3">
              <input
                type="text"
                name="state"
                placeholder="State"
                ref={register}
              />
            </div>
            <div className="col mb-3">
              <input
                type="text"
                name="zipCode"
                placeholder="ZipCode"
                ref={register}
              />
            </div>
            <div className="col mb-3">
              <input
                type="text"
                name="country"
                placeholder="Country"
                ref={register}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <input
                type="submit"
                value="Add Rental"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
