import React, { useState, useEffect } from 'react'

export default function WishList(wish) {

    const [wishCountry, setWishCountry] = useState([])
    // let api = `https://restcountries.eu/rest/v2/alpha?codes=`;
    // for(let i=0;i<=wishCountry.length; i++) {
    //      api += wishCountry[i] + ';'
    // }
    useEffect(() => {
        async function fetchData() {
            let response = await fetch(
                `https://restcountries.eu/rest/v2/name/${wish}`
            );
            let data = await response.json();
            if (response.ok) {
                setWishCountry(...wishCountry, data[0]);
            } else {
                setWishCountry([wishCountry]);
            }
        }
    }, [wishCountry])



    return (
        <div>
            {wishCountry.map((country) =>
                <h1>{country.name}</h1>
            )}
        </div>
    )
}
