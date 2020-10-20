import React, { useState, useEffect } from "react";
import RentalsCard from "../layout/RentalsCard";
import "../../style/CountryRentals.css";

export default function CountryRentals(props) {
  const [rentals, setRentals] = useState([]);

  const countryname = props.match.params.name;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
  };

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `http://localhost:8080/api/v1/rentals/country/${countryname}`,
        { method: "GET", headers: headers }
      );
      let data = await response.json();
      console.log(data);
      if (response.ok) {
        setRentals(data);
      } else {
        console.log("fara rentals");
      }
    }
    fetchData();
  }, [countryname, headers]);

  return (
    <div className="container countryRentals">
      <h1 className="text-center m-5">Places to Rent in {countryname}</h1>
      <div className="row">
        {rentals.map((rental, index) => {
          console.log(rental);
          return <RentalsCard rental={rental} key={index} />;
        })}
      </div>
    </div>
  );
}
