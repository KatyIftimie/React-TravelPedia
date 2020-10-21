import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import axios from "axios";

export default function AddReservation() {
  const rental_Id = window.location.href.split("/")[4];
  const API_URL =
    "http://localhost:8080/api/v1/rentals/" + rental_Id + "/rooms";
  const RENTAL_API_URL = "http://localhost:8080/api/v1/rentals/" + rental_Id;

  const [rental, setRental] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
    },
  };

  const checkIfRentalAvailable = () => {
    const currentDate = new Date();
    const rentalCheckOutDate = new Date(rental["checkOutTime"]);
    return rentalCheckOutDate > currentDate;
  };

  const minCheckInDateTime = () => {
    return formatDateForInput(null, false);
  };

  const minCheckOutDateTime = () => {
    return formatDateForInput(null, true);
  };

  const maxCheckoutDateTime = () => {
    return formatDateForInput(rental["checkOutTime"], false);
  };

  function formatDateForInput(date = null, addOne) {
    // eslint-disable-next-line no-extend-native
    Number.prototype.AddZero = function (b, c) {
      const l = String(b || 10).length - String(this).length + 1;
      return l > 0 ? new Array(l).join(c || "0") + this : this;
    };

    let d = date === null ? new Date() : new Date(date);
    if (addOne) d.setDate(d.getDate() + 1);
    return (
      [
        d.getFullYear(),
        (d.getMonth() + 1).AddZero(),
        d.getDate().AddZero(),
      ].join("-") +
      "T" +
      [d.getHours().AddZero(), d.getMinutes().AddZero()].join(":")
    );
  }

  useEffect(() => {
    if (loading) {
      async function fetchRooms() {
        let response = await fetch(API_URL, headers);
        let data = await response.json();

        if (response.ok) {
          setRooms(data);
        } else {
          console.log("NU SUNT CAMERE");
        }
      }

      async function fetchRental() {
        let response = await fetch(RENTAL_API_URL, headers);
        let data = await response.json();

        if (response.ok) {
          setRental(data);
          console.log(data);
        } else {
          console.log("N AM RENTAL FA");
        }
      }

      setLoading(false);

      fetchRental();
      fetchRooms();
    }
  }, [API_URL, RENTAL_API_URL, headers, loading]);

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
            .post("http://localhost:8080/api/v1/reservations", values, headers)
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
                      <Field
                        disabled={!checkIfRentalAvailable()}
                        name="checkInDate"
                        type="datetime-local"
                        min={minCheckInDateTime()}
                      />
                    </div>
                    <div className="col-sm-6 text-color">
                      <h5>Check Out</h5>
                      <Field
                        disabled={!checkIfRentalAvailable()}
                        name="checkOutDate"
                        type="datetime-local"
                        min={minCheckOutDateTime()}
                        max={maxCheckoutDateTime()}
                      />
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
                  {checkIfRentalAvailable() ? (
                    <input className="btn_1" type="submit"></input>
                  ) : null}
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
