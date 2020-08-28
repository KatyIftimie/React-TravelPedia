import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function CountryDetails(props) {
    const [details, setDetails] = useState([]);
    const [wishList, setWishList] = useState([]);

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

    const {
        alpha3Code,
        name,
        capital,
        region,
        subregion,
        flag,
        population,
        borders,
        timezones,
        currencies,
        languages,
    } = details;

    const StyledDiv = styled.div`
        width: 66.6%;
        height: auto;
        background-image: url(${details.flag});
        background-repeat: no-repeat;
        background-size: 100%;

        :hover {
            filter: brightness(0.7) drop-shadow(8px 8px 10px gray);
            transition: filter 350ms ease;
            cursor: pointer;
        }
    `;

    if (details[0] === "empty") {
        return <h1 className="text-center">Country not found!</h1>;
    }

    return (
        <div
            className="container"
            style={{
                paddingBottom: "45px",
                paddingLeft: "75px",
                backgroundColor: "rgb(228, 231, 237)",
            }}
        >
            <h1 className="my-4">{name}</h1>
            <div className="row">
                <StyledDiv className="container-fluid">
                    <StyledPopUp>aaaa</StyledPopUp>
                </StyledDiv>
                <div className="col-md-4 ">
                    <h3 className="my-3">Capital: {capital}</h3>
                    <h4 className="descriptions">Region: {region}</h4>
                    <h4 className="descriptions">Subregion: {subregion}</h4>
                    <h4 className="descriptions">Population: {population}</h4>
                    <h4 className="descriptions">
                        Language: {languages ? languages[0].name : null}{" "}
                    </h4>
                    <h4 className="descriptions">Timezone:</h4>
                    <ul style={listStyle}>
                        {timezones
                            ? timezones.map((timezone, keyIndex) => {
                                  return <li key={keyIndex}>{timezone}</li>;
                              })
                            : null}
                    </ul>
                    <h4 className="descriptions">
                        Currency : {currencies ? currencies[0].name : null}{" "}
                    </h4>
                    <h4 className="descriptions">Neighbours: </h4>
                    <ul style={listStyle}>
                        {borders
                            ? borders.map((neighbour, keyIndex) => {
                                  return <li key={keyIndex}>{neighbour}</li>;
                              })
                            : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const imgStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    border: "5px solid #98a1a8",
};

const StyledPopUp = styled.button`
    display: none;
    :hover {
        display: flex;
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
`;

const listStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0",
};
