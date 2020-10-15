import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import axios from "axios";
import Card from "react-bootstrap/Card";

export default function AddReservation() {
  const rental_Id = window.location.href.split("/")[4];
  const API_URL =
    "http://localhost:8080/api/v1/rentals/" + rental_Id + "/rooms";
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      let response = await fetch(API_URL);
      let data = await response.json();

      if (response.ok) {
        setRooms(data);
      } else {
        console.log("NU SUNT CAMERE");
      }
    }
    fetchRooms();
  }, [API_URL]);

  return (
    <div>
      <Formik
        initialValues={{
          checkInDate: "",
          checkOutDate: "",
          totalAmount: "",
          messageToHost: "",
          rentalID: rental_Id,
          reservationStatusID: "1",
          reservedRoomsIDs: [],
          guestUserID: window.sessionStorage.getItem("userId"),
        }}
        onSubmit={(values) => {
          console.log(values.totalAmount);
          axios
            .post("http://localhost:8080/api/v1/reservations", values)
            .then((res) => {
              if (res.status === 200) {
                console.log("succes");
                console.log(values);
              }
            });
        }}
      >
        {({ values, setFieldValue }) => (
          <div className="container addReservation">
            <h5 className="text-center">Make a reservation</h5>
            <div className="row">
              <div className="col-md-10 mx-auto">
                <Form className="addRentalForm">
                  <div className="form-group row">
                    <div className="col-sm-6 text-color">
                      <h5>Check In</h5>
                      <Field name="checkInDate" type="datetime-local" />
                    </div>
                    <div className="col-sm-6 text-color">
                      <h5>Check Out</h5>
                      <Field name="checkOutDate" type="datetime-local" />
                    </div>
                  </div>
                  <div className="form-group row text-color">
                    <h5>Write a message to host</h5>
                    <div className="col-sm-12">
                      <Field
                        name="messageToHost"
                        placeholder="Message to host..."
                      />
                    </div>
                  </div>
                  <div className="form-group ">
                    <h5 className="text-color"> Available rooms</h5>
                    <div className="col=-sm-12 ">
                      <div className="roomContainer mr-4">
                        {rooms.map((room, index) => {
                          return (
                            <div
                              className="card mb-4"
                              style={{ borderRadius: "25px" }}
                              key={index}
                            >
                              <h5 className="card-header">{room.name}</h5>
                              <div className="card-body">
                                <h5 className="card-title">
                                  {room.description}
                                </h5>
                                <h6>Amenities</h6>
                                {room.amenities.map((amenity, index) => (
                                  <span key={index}>{amenity.name} | </span>
                                ))}
                                <br />
                                <div className="form-group form-check form-check-inline">
                                  <label>
                                    <Field
                                      type="checkbox"
                                      name="reservedRoomsIDs"
                                      value={`${room.id}`}
                                    />
                                    I Want This Room
                                  </label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <input className="btn_1" type="submit"></input>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
