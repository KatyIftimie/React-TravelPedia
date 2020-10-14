import React from "react";

export default function BookingsCard(props) {
  return (
    <div className="">
      {" "}
      Check In : {props.booking.checkInDate.split("T")[0]} <br />
      Check Out : {props.booking.checkOutDate.split("T")[0]} <br />
      Price : {props.booking.totalAmount}
      <br />
      Message : {props.booking.messageToHost}
    </div>
  );
}
