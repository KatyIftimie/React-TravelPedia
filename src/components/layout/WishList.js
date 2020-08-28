import React, { useState, useEffect } from "react";

export default function WishList({ country }) {
  const [wishCountry, setWishCountry] = useState([]);

  useEffect(() => {
    setWishCountry(country);
  }, [country]);

  console.log(wishCountry);
  return <div className="div"></div>;
}
