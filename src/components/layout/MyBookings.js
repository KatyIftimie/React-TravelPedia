import React, { useState, useEffect } from "react";
import BookingCard from "../layout/BookingsCard";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userID = window.sessionStorage.getItem("userId");

  const reservationsApi = `http://localhost:8080/api/v1/reservations/user/${userID}`;

  useEffect(() => {
    axios.get(reservationsApi).then((res) => {
      setBookings(res.data);
      console.log(res);
    });
  }, [reservationsApi]);

  return (
    <div className="container countryRentals">
      <h1 className="text-center m-5">Your bookins</h1>
      <div className="row">
        {bookings.map((booking, index) => {
          return <BookingCard booking={booking} key={index} />;
        })}
      </div>
    </div>
  );
}
