import React, { useState, useEffect } from "react";

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
  console.log(details);

  const {
    name,
    capital,
    region,
    subregion,
    flag,
    population,
    borders,
    timezones,
  } = details;

  return (
    <div className="container">
      <h1 className="my-4">{name}</h1>
      <div className="row">
        <div className="col-md-8">
          <img src={flag} alt="flag"></img>
        </div>
        <div className="col-md-4">
          <h3 className="my-3">Capital: {capital}</h3>
          <h4 className="descriptions">Region: {region}</h4>
          <h4 className="descriptions">Subregion: {subregion}</h4>
          <h4 className="descriptions">Population: {population} M</h4>
          <h4 className="descriptions">Timezone: {timezones}</h4>
        </div>
      </div>
    </div>
  );
}

{
  /* <p>{name}</p>
      <p>{capital}</p>
      <p>{region}</p>
      <img src={flag} alt="flag"></img>
      <p>{timezones}</p>
      <p>{population}</p>
      <p>{borders}</p>
      <p>{subregion}</p> */
}
