import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";

import "../../style/CountryRentals.css";

export default function RentalView(props) {
  const [details, setDetails] = useState([]);
  const [hostID, setHostID] = useState(0);
  const [loading, setLoading] = useState(true);
  const userId = window.sessionStorage.getItem("userId");

  const rentalId = props.location.pathname.split("/")[2];
  const rentalApi = `http://localhost:8080/api/v1/rentals/${rentalId}`;
  const image = `http://localhost:8080/api/v1/images/rentals/rental-${details.id}-0`;
  const image2 = `http://localhost:8080/api/v1/images/rentals/rental-${details.id}-1`;

  const headers = {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    async function fetchData() {
      if (loading) {
        let response = await fetch(rentalApi, headers);
        let data = await response.json();
        if (response.ok) {
          console.log(data);
          setDetails(data);
          setHostID(data.hostAppUser.id);
          setLoading(false);
        }
      } else {
        console.log("nu merge");
      }
    }
    fetchData();
  }, [headers, loading, rentalApi]);

  const rating = 4;

  return (
    <div className="container propertyView">
      <h1> {details.name} </h1>

      <div>
        <StarRatingComponent name="rate1" starCount={5} value={rating} />
        <p style={{ color: "goldenrod" }}>
          {details.address ? details.address.city : null},{" "}
          {details.address ? details.address.state : null},{" "}
          {details.address ? details.address.country : null}
        </p>
        <p>{details.type ? details.type.name : null}</p>
      </div>
      <div className="sideBox">
        <p className="sideBoxTitle"> Reservation details</p>
        <div className="sideBoxInfo">
          <p>
            Check In Date:{" "}
            {details.checkInTime ? details.checkInTime.split("T")[0] : null}
          </p>
          <p>
            Check Out Date:{" "}
            {details.checkOutTime ? details.checkOutTime.split("T")[0] : null}
          </p>
          <p>
            Check In Time:{" "}
            {details.checkInTime
              ? details.checkInTime.split("T")[1].split("Z")[0]
              : null}{" "}
          </p>
          <p>
            Check Out Time:{" "}
            {details.checkOutTime
              ? details.checkOutTime.split("T")[1].split("Z")[0]
              : null}{" "}
          </p>
        </div>
      </div>

      <img
        className="img-fluid "
        style={{ width: "300px" }}
        src={image}
        alt="imag"
      />
      <img
        className="img-fluid "
        style={{ width: "300px" }}
        src={image2}
        alt="imag"
      />
      <h5>{details.description}</h5>
      <hr></hr>
      <h4>Amenities: </h4>

      <ul style={{ listStyleType: "square" }}>
        {details.amenities
          ? details.amenities.map((amenity, index) => (
              <li key={index}>{amenity.name}</li>
            ))
          : null}
      </ul>

      <hr></hr>
      <h5>Rooms: </h5>
      <div className="container">
        {details.rooms
          ? details.rooms.map((room, index) => (
              <div
                className="card"
                style={{
                  width: "400px",
                  display: "inline-block",
                  margin: "30px",
                  borderRadius: "25px",
                }}
                key={index}
              >
                <div className="card-body">
                  <h4 className="card-title">{room.name}</h4>
                  <small>
                    Type: {room.type.name}, <br />
                    Price: {room.price}$
                  </small>
                  <p className="card-text">{room.description}</p>
                  <div>
                    Beds:{" "}
                    {room.beds.map((bed, index) => (
                      <small key={index}>{bed.type}</small>
                    ))}
                  </div>
                  <div>
                    Amenities:{" "}
                    {room.amenities.map((amenity, index) => (
                      <small key={index}>-{amenity.name}- </small>
                    ))}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      {parseInt(userId) === hostID ? null : (
        <a href={`/rentals/${details.id}/add-reservation`} className="btn_1">
          Reserve now
        </a>
      )}

      <hr></hr>
      <h4>Reviews: </h4>
      <div>
        {details.reviews ? (
          details.reviews.map((review) => (
            <div className="card">
              <small>{review.posted}</small>
              <p>{review.message}</p>
            </div>
          ))
        ) : (
          <p style={{ fontStyle: "italic" }}>No reviews for this rental yet!</p>
        )}
      </div>
    </div>
  );
}
