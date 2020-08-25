import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CountryDetails(props) {
  const [details, setDetails] = useState([]);

  const name = props.location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}`
      );
      setDetails(res.data[0]);
    }

    fetchData();
  }, [name]);

  const { Countryname, capital, regin, subregion } = details;

  return (
    <div>
      <p>{Countryname}</p>
      <p>{capital}</p>
    </div>
  );
}
