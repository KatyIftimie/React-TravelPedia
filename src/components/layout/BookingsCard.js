import React from "react";

export default function BookingsCard(props) {
  return (
    <div className="card-box-a card-shadow mr-3 mt-5 mx-auto">
      <div className="img-box-a">
        {/* <img src={image} alt="" className="img-a " /> */}
      </div>
      <div className="card-overlay">
        <div className="card-overlay-a-content">
          <div className="card-header-a">
            <h2 className="card-title-a">
              <p className="rentalName text-sm" href="#">
                Check In : {props.booking.checkInDate.split("T")[0]} Time :{" "}
                {props.booking.checkInDate.split("T")[1]}
                <br />
                Check Out : {props.booking.checkOutDate.split("T")[0]} Time :{" "}
                {props.booking.checkOutDate.split("T")[1]}
              </p>
            </h2>
          </div>
          <div className="card-body-a">
            <div className="price-box d-flex">
              <span className="price-a">
                Price | Price : {props.booking.totalAmount} $
              </span>
            </div>
            {/* <a href={rentalUrl} className="link-a" style={{ color: "red" }}>
              Click here to view
              <span className="ion-ios-arrow-forward"></span>
            </a> */}
          </div>
          <div className="card-footer-a">
            <ul className="card-info d-flex justify-content-around">
              <li>
                <h4 className="card-info-title">Type</h4>
                {/* <span>
                  <sup>{props.rental.type.name}</sup>
                </span> */}
              </li>
              <li>
                <h4 className="card-info-title">Rooms</h4>
                {/* <span>{roomsNo}</span> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
