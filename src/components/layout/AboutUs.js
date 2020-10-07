import React, { useState } from "react";

export default function AboutUs() {
  const [noOfRooms, setNumberOfRooms] = useState(0);
  const [noOfRentals, getNumberOfRentals] = useState(0);

  const GET_ALL_ROOMS_API = "";
  const GET_ALL_RENTALS_API = "";

  return (
    <div class="aboutus-area">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="aboutus-image float-left hidden-sm"></div>
            </div>
            <div class="col-md-8 col-sm-6 col-xs-12">
              <div class="aboutus-content ">
                <h1>
                  aboutus <span>Sopno</span>
                </h1>
                <h4>Property Details</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has oots in a piece of classitin literature from 45
                  BC, making it over 2000 years old. Richard McClint professor
                  at Hamden dney College irginia, looked up one of the more
                  obscure Latin words, consectetur, from a Lorem Ipsum passage,
                  and going through the cites of the word in classical
                  literature.
                </p>

                <div class="counter ">
                  <div class="single-counter text-center">
                    <h2 class="counter">1500</h2>
                    <p>Places To Rent</p>
                  </div>

                  <div class="single-counter text-center">
                    <h2 class="counter">10</h2>
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
