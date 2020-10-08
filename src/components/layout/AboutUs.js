import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AboutUs() {
  const [roomsNumber, setRoomNumber] = useState(0);
  const [rentalNumbers, setRentalNumbers] = useState(0);

  const getNumberApi =
    "http://localhost:8080/api/v1/rentals/count-rentals-and-rooms";

  useEffect(() => {
    axios.get(getNumberApi).then((res) => {
      setRentalNumbers(res.data.count_rentals);
      setRoomNumber(res.data.count_rooms);
    });
  });

  return (
    <div className="aboutus-area">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="aboutus-image float-left hidden-sm"></div>
            </div>
            <div className="col-md-8 col-sm-6 col-xs-12">
              <div className="aboutus-content ">
                <h1>
                  aboutus <span> TravelPedia </span>
                </h1>
                <h4>Properties to Rent</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has oots in a piece of classNameitin literature from
                  45 BC, making it over 2000 years old. Richard McClint
                  professor at Hamden dney College irginia, looked up one of the
                  more obscure Latin words, consectetur, from a Lorem Ipsum
                  passage, and going through the cites of the word in
                  classNameical literature.
                </p>

                <div className="counter ">
                  <div className="single-counter text-center">
                    <h2 className="counter">{rentalNumbers}</h2>
                    <p>Places To Rent</p>
                  </div>

                  <div className="single-counter text-center">
                    <h2 className="counter">{roomsNumber}</h2>
                    <p>Total Rooms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
