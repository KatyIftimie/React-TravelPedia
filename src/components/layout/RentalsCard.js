import React from "react";
import "../../style/CountryRentals.css";

export default function RentalsTable(props) {
  return (
    <div className="card-deck">
      <div className="card">
        <img src="" alt="" />
        <div className="card-body">
          <h5 className="card-title">{props.rental.name}</h5>
          <p className="card-text">{props.rental.description}</p>
          <p className="card-text">
            <small className="text-muted">
              {props.rental.address.city}, {props.rental.address.state}
            </small>
          </p>
          <h5>{props.rental.minimumPricePerNight}</h5>
        </div>
      </div>
    </div>
  );
}
