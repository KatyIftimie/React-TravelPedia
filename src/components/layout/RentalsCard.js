import React from "react";
import Image from "../../img/No-image-found.jpg";
import Prop1 from "../../img/property-1.jpg";

import "../../style/RentalsCard.css";

import "../../style/CountryRentals.css";

export default function RentalsTable(props) {
  const rentalUrl = `/rental-details/${props.rental.id}`;
  const roomsNo = props.rental.rooms.length;

  return (
    <div
      className="card-box-a card-shadow mr-3 mt-5 mx-auto"
      // style={{ width: "30%", height: "100%" }}
    >
      <div className="img-box-a">
        <img src={Prop1} alt="" className="img-a img-fluid" />
      </div>
      <div className="card-overlay">
        <div className="card-overlay-a-content">
          <div className="card-header-a">
            <h2 className="card-title-a">
              <a href="#">
                {props.rental.name}
                <br />
                {props.rental.address.city}
              </a>
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
