import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

export default function AddRental2() {
  const API_URL = "http://localhost:8080/api/v1";

  const [amnities, setAmnities] = useState([]);
  const [roomTypes, setRoomType] = useState([]);

  useEffect(() => {
    async function fetchAmenities() {
      let response = await fetch(API_URL + "/amenities");
      let data = await response.json();

      if (response.ok) {
        setAmnities(data);
      } else {
        console.log("nu");
      }
    }

    async function fetchRoomTypes() {
      let response = await fetch(API_URL + "/rooms/room-types");
      let data = await response.json();
      if (response.ok) {
        setRoomType(data);
      } else {
        console.log("nu camere");
      }
    }

    fetchAmenities();
    fetchRoomTypes();
  }, []);

  return (
    <div>
      <h5 className="text-center">Add New Rental</h5>
      <Formik
        initialValues={{
          name: "",
          description: "",
          checkInTime: "12-02-1989",
          checkOutTime: "",
          addressDto: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
          amenitiesIDs: [],
        }}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <Form className="addRentalForm">
                <div className="form-group row">
                  <div className="col-sm-6">
                    <Field name="name" placeholder="Name" />
                  </div>
                  <div className="col-sm-6">
                    <Field name="description" placeholder="Description" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    Check In
                    <Field name="checkInType" type="date" />
                  </div>
                  <div className="col-sm-6">
                    Check Out
                    <Field name="checkOutTime" placeholder="Name" type="date" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    Address
                    <Field
                      name="addressDto.addressLine1"
                      placeholder="Address Line 1"
                    />
                  </div>
                  <div className="col-sm-6">
                    Address (Line 2)
                    <Field
                      name="addressDto.addressLine2"
                      placeholder="Address Line 2"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm">
                    <Field name="addressDto.city" placeholder="City" />
                  </div>
                  <div className="col-sm">
                    <Field name="addressDto.state" placeholder="State" />
                  </div>
                  <div className="col-sm">
                    <Field name="addressDto.zipCode" placeholder="Zip code" />
                  </div>
                  <div className="col-sm">
                    <Field name="addressDto.country" placeholder="Country" />
                  </div>
                </div>
                <div className="row">
                  <h5>Amenities</h5>
                </div>
                <div className="row">
                  {amnities.map((amenitie, index) => (
                    <label>
                      <input
                        type="checkbox"
                        value={amenitie.id}
                        name="amenitiesIDs"
                      />
                      {amenitie.name}
                    </label>
                  ))}
                </div>

                <button type="submit">Submit</button>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
}
