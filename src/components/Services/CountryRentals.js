import React, { useState, useEffect } from "react";
import RentalsCard from "../layout/RentalsCard";
import "../../style/CountryRentals.css";

export default function CountryRentals(props) {
  const [rentals, setRentals] = useState([]);
  const [numbersOfItems, setNumberofItems] = useState(4);

  const countryname = props.match.params.name;

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `http://localhost:8080/api/v1/rentals/country/${countryname}`
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
  }, [countryname]);

  const hostelRental = rentals.filter(
    (rental) => rental.type.name === "HOSTEL"
  );

  const suiteRental = rentals.filter((rental) => rental.type.name === "SUITE");

  console.log(hostelRental);

  return (
    <div>
      <h1 className="text-center m-5">Places to Rent in Romania</h1>

      {rentals.map((rental, index) => {
        return <RentalsCard rental={rental} key={index} />;
      })}
      {/* {rentalsToShow.length ? rentalsToShow : "Fetching Data..."} */}
    </div>
  );
}
