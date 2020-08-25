import React from "react";
import { Link } from "react-router-dom";
import CountryDetails from "./CountryDetails";

export default function Country({ country }) {
  const { name, capital, flag } = country;

  return (
    <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div style={cardStyle} className="card">
        <div className="img-container p-5">
          <Link
            to={{
              pathname: `/details/${name}`,
              detailsProps: { name: name },
            }}
          >
            <img className="img-fluid " src={flag} alt="flag" />
          </Link>
        </div>
        <div className="card-body">
          <h4>{name}</h4>
          <p>{capital}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  width: "18rem",
  height: "22rem",
  textAlign: "center",
};
