import React from "react";

export default function BookingsCard(props) {
  const image = `http://localhost:8080/api/v1/images/rentals/rental-${props.booking.rental.address.id}-0`;
  const roomsNo = props.booking.reservedRooms.length;

  const calculatePrice = (roomsList) => {
    let total = 0;
    roomsList.map((room) => (total += room.price));
    return total;
  };

  let price = calculatePrice(props.booking.reservedRooms);

  const checkIn = props.booking.checkInDate.split("T")[0];
  const checkInTime = props.booking.checkInDate
    .split("T")[1]
    .split(".")[0]
    .slice(0, 5);

  const checkOut = props.booking.checkOutDate.split("T")[0];
  const checkOutTime = props.booking.checkOutDate
    .split("T")[1]
    .split(".")[0]
    .slice(0, 5);

  return (
    <div className="card-box-a card-shadow mr-3 mt-5 mx-auto">
      <div className="img-box-a">
        <img src={image} alt="" className="img-a " />
      </div>
      <div className="card-overlay">
        <div className="card-overlay-a-content">
          <div className="card-header-a">
            <h2 className="card-title-a">
              <p className="rentalName text-sm" href="#">
                Check In : {checkIn} <br /> Time : {checkInTime}
                <br />
                Check Out : {checkOut}
                <br /> Time : {checkOutTime}
              </p>
            </h2>
          </div>
          <div className="card-body-a">
            <div className="price-box d-flex">
              <span className="price-a">Price To Pay : {price} $</span>
            </div>
            {props.booking.reservedRooms.map((room, index) => {
              return (
                <span className="text-danger" key={index}>
                  {" "}
                  {room.name} |{" "}
                </span>
              );
            })}
          </div>
          <div className="card-footer-a">
            <ul className="card-info d-flex justify-content-around">
              <li>
                <h4 className="card-info-title">Type</h4>
                <span>
                  <sup>{props.booking.rental.type.name}</sup>
                </span>
              </li>
              <li>
                <h4 className="card-info-title">Rooms</h4>
                <span>{roomsNo}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
