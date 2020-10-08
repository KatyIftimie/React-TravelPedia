import React from "react";

import "../../style/RentalsCard.css";

import "../../style/CountryRentals.css";

export default function RentalsTable(props) {
  const rentalUrl = `/rental-details/${props.rental.id}`;
  const roomsNo = props.rental.rooms.length;
  const image = `http://localhost:8080/api/v1/images/rentals/rental-${props.rental.id}-0`;

  return (
    <div className="card-box-a card-shadow mr-3 mt-5 mx-auto">
      <div className="img-box-a">
        <img src={image} alt="" className="img-a " />
      </div>
      <div className="card-overlay">
        <div className="card-overlay-a-content">
          <div className="card-header-a">
            <h2 className="card-title-a">
              <p className="rentalName" href="#">
                {props.rental.name}
                <br />
                {props.rental.address.city}
              </p>
            </h2>
          </div>
          <div className="card-body-a">
            <div className="price-box d-flex">
              <span className="price-a">
                Price | {props.rental.minimumPricePerNight} $
              </span>
            </div>
            <a href={rentalUrl} className="link-a" style={{ color: "red" }}>
              Click here to view
              <span className="ion-ios-arrow-forward"></span>
            </a>
          </div>
          <div className="card-footer-a">
            <ul className="card-info d-flex justify-content-around">
              <li>
                <h4 className="card-info-title">Type</h4>
                <span>
                  <sup>{props.rental.type.name}</sup>
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
