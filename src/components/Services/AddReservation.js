import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import axios from "axios";
import Card from "react-bootstrap/Card";

export default function AddReservation() {
  const rental_Id = window.location.href.split("/")[4];
  const API_URL =
    "http://localhost:8080/api/v1/rentals/" + rental_Id + "/rooms";
  const [rooms, setRooms] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

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

  const calculateTotal = (value, room) => {
    setTimeout(() => {
      console.log(totalPrice);
      console.log(value);
      console.log(typeof value[0]);
      console.log(typeof room);
      if (value.includes(room)) {
        setTotalPrice(totalPrice + room.price);
        console.log(totalPrice);
      }
    }, 500);
  };

  return (
    <div>
      <Formik
        initialValues={{
          prices: [],
          checkinDate: "",
          checkoutDate: "",
          totalAmount: "",
          messageToHost: "",
          rentalID: rental_Id,
          reservationStatusID: "",
          reservedRoomsIDs: [],
          guestUserID: window.sessionStorage.getItem("userId"),
        }}
        onSubmit={(values) => {
          console.log(values);
          // same shape as initial values
          axios
            .post("localhost:8080/api/v1/reservations", values)
            .then((res) => {
              if (res.status === 200) {
                console.log("succes");
                console.log(values);
              }
            });
        }}
      >
        {({ values }) => (
          <div className="container addReservation">
            <h5 className="text-center">Make a reservation</h5>
            <div className="row">
              <div className="col-md-10 mx-auto">
                <Form className="addRentalForm">
                  <div className="form-group row">
                    <div className="col-sm-6">
                      Check In
                      <Field name="checkinDate" type="datetime-local" />
                    </div>
                    <div className="col-sm-6">
                      Check Out
                      <Field name="checkoutDate" type="datetime-local" />
                    </div>
                  </div>
                  <div className="form-group row">
                    Write a message to host
                    <div className="col-sm-12">
                      <Field
                        name="messageToHost"
                        placeholder="Message to host..."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    Available rooms
                    <div className="col=-sm-12">
                      <div className="roomContainer" style={roomContainerStyle}>
                        {rooms.map((room, index) => {
                          return (
                            <Card style={{ width: "18rem" }} key={index}>
                              <Card.Body>
                                <Card.Title>{room.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {room.price} $
                                </Card.Subtitle>
                                <Card.Text style={cardTextStyle}>
                                  {room.description}
                                  <br></br>
                                  Amenities:<br></br>
                                  {room.amenities.map((amenity) => (
                                    <>
                                      {"\u00A0"}
                                      {amenity.name}
                                      <br></br>
                                    </>
                                  ))}
                                </Card.Text>
                                <div className="form-group form-check form-check-inline">
                                  <label>
                                    <Field
                                      type="checkbox"
                                      name="reservedRoomsIDs"
                                      value={`${room.id}`}
                                      onClick={() => {
                                        setTotalPrice(totalPrice + room.price);
                                      }}
                                    />
                                    I Want This Room
                                  </label>
                                </div>
                              </Card.Body>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* Total price */}
                  <div
                    style={priceStyle}
                    className="col-sm-6"
                    name="totalAmount"
                  >
                    {/* Total amount:{"\u00A0"}
                    {totalPrice} */}
                  </div>
                  <button type="submit">Submit</button>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
const roomContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
};

const cardTextStyle = {
  color: "black",
  content: "normal",
};

const priceStyle = {
  fontWeight: "bold",
};
