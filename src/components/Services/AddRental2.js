import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import FormikCheckbox from "./FormikCheckbox";

export default function AddRental2() {
  const API_URL = "http://localhost:8080/api/v1";

  const [amnities, setAmnities] = useState([]);
  const [roomTypes, setRoomType] = useState([]);
  const [bedType, setBedType] = useState([]);
  const [bedsNo, setBedsNo] = useState(0);

  useEffect(() => {
    async function fetchAmenities() {
      let response = await fetch(API_URL + "/amenities");
      let data = await response.json();

      if (response.ok) {
        setAmnities(data);
      } else {
        console.log("nu");
      }
    }

    async function fetchRoomTypes() {
      let response = await fetch(API_URL + "/rooms/room-types");
      let data = await response.json();
      if (response.ok) {
        setRoomType(data);
      } else {
        console.log("nu camere");
      }
    }

    async function fetchBeds() {
      let response = await fetch(API_URL + "/beds");
      let data = await response.json();
      if (response.ok) {
        setBedType(data);
      } else {
        console.log("nu paturi");
      }
    }

    fetchAmenities();
    fetchRoomTypes();
    fetchBeds();
  }, [bedsNo]);
  console.log(bedType);

  return (
    <div>
      <h5 className="text-center">Add New Rental</h5>
      <Formik
        initialValues={{
          name: "",
          description: "",
          checkInTime: "",
          checkOutTime: "",
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
          console.log(values);
        }}
      >
        {({ values }) => (
          <div className="container">
            <div className="row">
              <div className="col-md-10 mx-auto">
                <Form className="addRentalForm">
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <Field name="name" placeholder="Name" />
                    </div>
                    <div className="col-sm-6">
                      <Field name="description" placeholder="Description" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      Check In
                      <Field name="checkInType" type="date" />
                    </div>
                    <div className="col-sm-6">
                      Check Out
                      <Field
                        name="checkOutTime"
                        placeholder="Name"
                        type="date"
                      />
                    </div>
                  </div>

                  {/* address */}
                  <div className="form-group row">
                    <div className="col-sm-6">
                      Address
                      <Field
                        name="addressDto.addressLine1"
                        placeholder="Address Line 1"
                      />
                    </div>
                    <div className="col-sm-6">
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
                  <div className="row">
                    <h5 className="mt-3 col-sm">Amenities</h5>
                  </div>
                  <div className="row">
                    {amnities.map((amenity, index) => {
                      if (amenity.amenityType.name === "RENTAL_AMENITY") {
                        return (
                          <FormikCheckbox
                            name="amenitiesIDs"
                            value={amenity.id}
                            amenity={amenity}
                            key={index}
                            className="form-check form-check-inline"
                          />
                        );
                      }
                    })}
                  </div>

                  {/* Rooms */}
                  <div className="row">
                    <div className="col-sm">
                      <h5 className="mt-3">Room Type</h5>
                    </div>
                  </div>
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

                              return (
                                <div key={index}>
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
                                    {amnities.map((amenity, index) => {
                                      if (
                                        amenity.amenityType.name ===
                                        "ROOM_AMENITY"
                                      ) {
                                        return (
                                          <FormikCheckbox
                                            name={roomAmenity}
                                            value={amenity.id}
                                            amenity={amenity}
                                            key={index}
                                            className="form-check form-check-inline"
                                          />
                                        );
                                      }
                                    })}
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col-sm-4">
                                      <input
                                        type="number"
                                        placeholder="Please Choose Number of Beds"
                                        onChange={(e) =>
                                          setBedsNo(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-4">
                                      <Field as="select" name={bedIds}>
                                        {bedType.map((bed, index) => (
                                          <option value={bed.id} key={index}>
                                            {" "}
                                            {bed.type}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            <button
                              className="button"
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

                  <button type="submit">Submit</button>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
