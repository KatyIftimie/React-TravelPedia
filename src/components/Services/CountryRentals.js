import React, { useState, useEffect } from "react";

export default function CountryRentals(props) {
  const [rentals, setRentals] = useState([]);

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

  return (
    <div>
      <h1 className="text-center">Places to Rent in Romania</h1>
      <table class="table table-bordered rentalTable">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
