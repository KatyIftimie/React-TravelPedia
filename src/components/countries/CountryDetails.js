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
    currencies,
    languages
    
  } = details;
  if(details.length === 0 ){
    return (
      <p>Country not found!</p>
    ) 
  }
  return (
    <div className="container">
      <h1 className="my-4">{name}</h1>
      <div className="row">
        <div className="col-md-8">
          <img style={imgStyle} src={flag} alt="flag"></img>
        </div>
        <div className="col-md-4">
          <h3 className="my-3">Capital: {capital}</h3>
          <h4 className="descriptions">Region: {region}</h4>
          <h4 className="descriptions">Subregion: {subregion}</h4>
          <h4 className="descriptions">Population: {population}</h4>
          <h4 className="descriptions">Language: {languages ? languages[0].name : null} </h4>
          <h4 className="descriptions">Timezone:</h4>
          <ul style={listStyle}>
             {timezones ? timezones.map(timezone => { return <li>{timezone}</li>}) : null}
          </ul>
          <h4 className="descriptions">Currency : {currencies ? currencies[0].name : null} </h4>
          <h4 className="descriptions">Neighbours: </h4>
          <ul style={listStyle}>
             {borders ? borders.map(neighbour => { return <li>{neighbour}</li>}) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

const imgStyle = {
  maxWidth: "100%",
  maxHeight:"100%",
  border: "5px solid #98a1a8"
};


const listStyle={
  listStyleType: "none",
  margin: "0",
  padding: "0"
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
