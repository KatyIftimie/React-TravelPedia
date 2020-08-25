import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "../countries/Country"
import { Link } from 'react-router-dom'

export default function Europe() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://restcountries.eu/rest/v2/region/europe')

      setCountries(res.data);
      console.log(res.data)
    }
    fetchData()

  }, [setCountries])

  return (
    <div className="container">
      <div className="row">
        {countries.map((country, i) => (
          <>
            <Link to={`/details/${country.name}`} >
              <Country key={i} country={country} />
            </Link>

          </>
        ))}
      </div>
    </div>
  );
}
