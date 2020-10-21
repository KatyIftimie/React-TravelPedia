import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import FormikCheckbox from "./FormikCheckbox";
import axios from "axios";
import swal from "@sweetalert/with-react";

export default function AddRental2() {
  const API_URL = "http://localhost:8080/api/v1";
  const RENTAL_API_URL = "http://localhost:8080/api/v1/rentals";
  const amenitiesApi = API_URL + "/amenities";
  const roomsApi = API_URL + "/rooms/room-types";
  const bedsApi = API_URL + "/beds";
  const rentalsTypeApi = API_URL + "/rentals/rental-types";

  const [amnities, setAmnities] = useState([]);
  const [roomTypes, setRoomType] = useState([]);
  const [bedType, setBedType] = useState([]);
  const [rentalType, setRentalType] = useState([]);
  const [loading, setLoading] = useState(true);

  let fd = new FormData();

  const headers = {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    if (loading) {
      const requestOne = axios.get(amenitiesApi, headers);
      const requestTwo = axios.get(roomsApi, headers);
      const requestThree = axios.get(bedsApi, headers);
      const requestFour = axios.get(rentalsTypeApi, headers);

      axios
        .all([requestOne, requestTwo, requestThree, requestFour])
        .then(
          axios.spread((...responses) => {
            const AmenitiesList = responses[0];
            const RoomsList = responses[1];
            const BedList = responses[2];
            const RentalsTypeList = responses[3];
            console.log(BedList);

            setAmnities(AmenitiesList.data);
            setRoomType(RoomsList.data);
            setBedType(BedList.data);
            setRentalType(RentalsTypeList.data);
            console.log(BedList, RoomsList);
            setLoading(false);
          })
        )
        .catch((errors) => {
          // react on errors.
        });
    }
  }, [amenitiesApi, bedsApi, headers, loading, rentalsTypeApi, roomsApi]);

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          description: "",
          checkInTime: "",
          checkOutTime: "",
          rentalTypeID: "",
          hostUserID: window.sessionStorage.getItem("userId"),
          addressDto: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
          amenitiesIDs: [],
          roomsDtoList: [
            {
              name: "",
              description: "",
              price: "",
              amenitiesIDs: [],
              bedsIDs: [],
              roomTypeID: "",
            },
          ],
        }}
        onSubmit={(values) => {
          // same shape as initial values
          axios.post(RENTAL_API_URL, values, headers).then((res) => {
            if (res.status === 200) {
              axios
                .post(
                  `http://localhost:8080/api/v1/rentals/${res.data.new_rental_id}/images`,
                  fd,
                  headers
                )
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    let rentalId = res.config.url.split("/").slice(-2)[0];

                    swal({
                      title: "Good job!",
                      text: "Your rental was added",
                      icon: "success",
                      button: { text: "OK", className: "btn_1" },
                    }).then(function () {
                      window.location = `/rental-details/${rentalId}`;
                    });
                  }
                });
            }
          });
        }}
      >
        {({ values }) => (
          <div className="container addRental ">
            <div className="row ">
              <div className="col-md-10 mx-auto">
                <Form className="addRentalForm" encType="multipart/form-data">
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <Field name="name" placeholder="Rental Name" />
                    </div>
                    <div className="col-sm-6 text-warning">
                      <Field name="description" placeholder="Description" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 text-color">
                      Check In <i className="far fa-check-circle"></i>
                      <Field name="checkInTime" type="datetime-local" />
                    </div>
                    <div className="col-sm-6 text-color">
                      Check Out
                      <Field
                        name="checkOutTime"
                        placeholder="Name"
                        type="datetime-local"
                      />
                    </div>
                  </div>

                  {/* address */}
                  <div className="form-group row">
                    <div className="col-sm-6 text-color">
                      Address <i className="far fa-address-card"></i>
                      <Field
                        name="addressDto.addressLine1"
                        placeholder="Address Line 1"
                      />
                    </div>
                    <div className="col-sm-6 text-color">
                      Address (Line 2)
                      <Field
                        name="addressDto.addressLine2"
                        placeholder="Address Line 2"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm">
                      <Field name="addressDto.city" placeholder="City" />
                    </div>
                    <div className="col-sm">
                      <Field name="addressDto.state" placeholder="State" />
                    </div>
                    <div className="col-sm">
                      <Field name="addressDto.zipCode" placeholder="Zip code" />
                    </div>
                    <div className="col-sm">
                      <Field name="addressDto.country" placeholder="Country" />
                    </div>
                  </div>
                  <div className="row col-sm">
                    <h6 className="text-color">Rental Type</h6>{" "}
                    <i className="fas fa-house-user mt-1 ml-3"></i>
                  </div>
                  <div className="row">
                    <Field
                      as="select"
                      name="rentalTypeID"
                      className="rentalSelect "
                    >
                      {rentalType.map((rental, index) => (
                        <option
                          className="selectOptions"
                          value={rental.id}
                          key={index}
                        >
                          {rental.name}{" "}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="row">
                    <h5 className="mt-3 col-sm text-color">Amenities</h5>
                  </div>
                  <div className="row">
                    {amnities.map((amenity, index) => {
                      return amenity.amenityType.name === "RENTAL_AMENITY" ? (
                        <FormikCheckbox
                          name="amenitiesIDs"
                          value={amenity.id}
                          amenity={amenity}
                          key={index}
                          className="form-check form-check-inline mx-auto"
                        />
                      ) : null;
                    })}
                  </div>

                  {/* Rooms */}

                  <div className="form-group row">
                    <div className="col-sm">
                      <FieldArray name="roomsDtoList">
                        {({ push }) => (
                          <div>
                            {values.roomsDtoList.map((room, index) => {
                              const name = `roomsDtoList[${index}].name`;
                              const roomDescription = `roomsDtoList[${index}].description`;
                              const roomPrice = `roomsDtoList[${index}].price`;
                              const roomAmenity = `roomsDtoList[${index}].amenitiesIDs`;
                              const bedIds = `roomsDtoList[${index}].bedsIDs`;
                              const roomType = `roomsDtoList[${index}].roomTypeID`;

                              return (
                                <div key={index}>
                                  <h5 className="mt-3 text-color">Room Type</h5>
                                  <div className="form-group row">
                                    <div className="col-sm-6">
                                      <Field
                                        type="text"
                                        name={name}
                                        placeholder="Room Name"
                                      />
                                    </div>
                                    <div className="col-sm-6">
                                      <Field
                                        type="text"
                                        name={roomPrice}
                                        placeholder="Room Price"
                                      />
                                    </div>
                                  </div>
                                  <Field
                                    type="text"
                                    name={roomDescription}
                                    placeholder="Room Description"
                                  />

                                  <div className="row">
                                    {amnities.map((amenity, index) =>
                                      amenity.amenityType.name ===
                                      "ROOM_AMENITY" ? (
                                        <FormikCheckbox
                                          name={roomAmenity}
                                          value={amenity.id}
                                          amenity={amenity}
                                          key={index}
                                          className="form-check form-check-inline"
                                        />
                                      ) : null
                                    )}
                                  </div>
                                  <div className="row ">
                                    <h5 className="mt-5 mx-auto text-color">
                                      Please choose type of bed
                                    </h5>
                                  </div>
                                  <div className="row">
                                    {bedType.map((bed, index) => (
                                      <div className="row mx-auto" key={index}>
                                        <div className="col-sm">
                                          <FormikCheckbox
                                            name={bedIds}
                                            value={bed.id}
                                            amenity={bed}
                                            key={index}
                                            className="form-check form-check-inline"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row mt-5">
                                    <h5 className="mx-auto mt-2 text-color">
                                      Please choose room type
                                    </h5>
                                  </div>
                                  <div className="row ">
                                    {roomTypes.map((room, index) => (
                                      <div className="row mx-auto" key={index}>
                                        <div className="col-sm">
                                          <FormikCheckbox
                                            name={roomType}
                                            value={room.id}
                                            amenity={room}
                                            key={index}
                                            className="form-check form-check-inline"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}

                            <button
                              className="btn_1"
                              type="button"
                              onClick={() =>
                                push({
                                  name: "",
                                  description: "",
                                  price: "",
                                  amenitiesIDs: [],
                                  bedsIDs: [],
                                  roomTypeID: "",
                                })
                              }
                            >
                              Add Another Room
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="files.file1"
                    onChange={(e) => {
                      fd.append("file1", e.target.files[0]);
                    }}
                  />
                  <input
                    type="file"
                    name="files.file2"
                    onChange={(e) => {
                      fd.append("file2", e.target.files[0]);
                    }}
                  />
                  <input
                    type="file"
                    name="files.file3"
                    onChange={(e) => {
                      fd.append("file3", e.target.files[0]);
                    }}
                  />
                  <input
                    type="file"
                    name="files.file4"
                    onChange={(e) => {
                      fd.append("file4", e.target.files[0]);
                    }}
                  />
                  <input
                    type="file"
                    name="files.file5"
                    onChange={(e) => {
                      fd.append("file5", e.target.files[0]);
                    }}
                  />

                  <input className="btn_1" type="submit"></input>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
