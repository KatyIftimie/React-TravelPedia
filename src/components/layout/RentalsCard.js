import React from "react";
import { Link } from "react-router-dom";
import "../../style/CountryRentals.css";

export default function RentalsTable(props) {
  return (
    <div className="card-deck">
      <div className="card" >
        <Link
          to={{
            pathname: `/rental-details/${props.rental.id}`,
            detailsProps: { id: props.rental.id },
          }}
        >

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
        </Link>
      </div>
    </div>
  );
}
