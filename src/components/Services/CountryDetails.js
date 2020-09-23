import React, { useState, useEffect } from "react";

export default function CountryDetails(props) {
  const [details, setDetails] = useState([]);

  const countryname = props.match.params.name;

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://restcountries.eu/rest/v2/name/${countryname}`
      );
      let data = await response.json();
      if (response.ok) {
        setDetails(data[0]);
      } else {
        setDetails(["empty"]);
      }
    }

    fetchData();
  }, [countryname]);

  return <h1 className="text-center">Places to rent in {countryname}</h1>;
}
