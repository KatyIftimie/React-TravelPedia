import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CountryDetails(props) {
  const [details, setDetails] = useState([]);
  console.log(props);
  const name = props.location.pathname.split("/")[2];
  console.log(name);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}`
      );
      console.log(res.data[0].name);
      setDetails(res.data[0]);
    }
    fetchData();
  }, [name, props]);

  return (
    <div>
      <p>{details.name}</p>
    </div>
  );
}
