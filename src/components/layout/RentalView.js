import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import NoImage from "../../img/No-image-found.jpg";
import "../../style/CountryRentals.css";

export default function RentalView(props) {
  const [details, setDetails] = useState([]);
  const rentalId = props.location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `http://localhost:8080/api/v1/rentals/${rentalId}`
      );
      let data = await response.json();
      if (response.ok) {
        setDetails(data);
      } else {
        console.log("nu merge");
      }
    }
    fetchData();
  }, [rentalId]);

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
          <p>Price per night: {details.minimumPricePerNight} RON</p>
        </div>
      </div>

      <img
        className="img-fluid "
        style={{ width: "500px" }}
        src={NoImage}
        alt="imag"
      />
      <h5>{details.description}</h5>
      <hr></hr>
      <h4>Amenities: </h4>

      <ul style={{ listStyleType: "square" }}>
        {details.amenities
          ? details.amenities.map((amenity) => <li>{amenity.name}</li>)
          : null}
      </ul>

      <hr></hr>
      <h5>Rooms: </h5>
      <div class="container">
        {details.rooms
          ? details.rooms.map((room) => (
              <div
                class="card"
                style={{
                  width: "400px",
                  display: "inline-block",
                  margin: "30px",
                }}
              >
                <img
                  class="card-img-top"
                  src={NoImage}
                  alt="Card imag"
                  style={{ width: "100%" }}
                />
                <div class="card-body">
                  <h4 class="card-title">{room.name}</h4>
                  <small>
                    Type: {room.type.name}, Price: {room.price}
                  </small>
                  <p class="card-text">{room.description}</p>
                  <div>
                    Beds:{" "}
                    {room.beds.map((bed) => (
                      <small>{bed.type}</small>
                    ))}
                  </div>
                  <div>
                    Amenities:{" "}
                    {room.amenities.map((amenity) => (
                      <small>-{amenity.name}- </small>
                    ))}
                  </div>

                  <a href="/" class="btn btn-primary">
                    Reserve now
                  </a>
                </div>
              </div>
            ))
          : null}
      </div>

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
