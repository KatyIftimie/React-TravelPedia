import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "../countries/Country"

export default function Europe() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://restcountries.eu/rest/v2/region/asia')

      setCountries(res.data);
      console.log(res.data)
    }
    fetchData()

  }, [setCountries])

  return (
    <div className="container">
      <div className="row">
        {countries.map((country, i) => (
          <Country key={i} country={country} />
        ))}
      </div>
    </div>
  );
}
