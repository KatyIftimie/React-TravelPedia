import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CountryDetails(props) {
  const [details, setDetails] = useState([]);

  const countryname = props.location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://restcountries.eu/rest/v2/name/${countryname}`
      );
      let data = await response.json();
      if (response.ok) {
        setDetails(data[0]);
      }
    }

    fetchData();
  }, [countryname]);

  const { name, capital, region, subregion } = details;

  return (
    <div>
      <p>{name}</p>
      <p>{capital}</p>
    </div>
  );
}
