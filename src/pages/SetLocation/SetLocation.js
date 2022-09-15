import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSetLocation } from "../../components/useSetLocation/useSetLocation";
import "./setLocation.css";

const center = {
  lat: 35.699736,
  lng: 51.338061,
};

const SetLocation = ({ token, onAddNewPost }) => {
  const {
    markerRef,
    setFormData,
    formData,
    toggleDraggable,
    eventHandlers,
    submitHandler,
    draggable,
    position,
  } = useSetLocation(token, onAddNewPost, center);

  const renderHeader = () => {
    return (
      <div className="cardHeader">
        <h1 className="ui header">Set Your Location</h1>
        <p>
          set your location in the app to show to another users, Click on Marker
          location and drag it.
        </p>
      </div>
    );
  };

  const renderMap = () => {
    return (
      <div className="map-container">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          >
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                  ? "Marker is draggable"
                  : "Click here to make marker draggable"}
              </span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="form-container">
        <form onSubmit={submitHandler} className="ui form">
          <h4 className="ui dividing header">Your Information</h4>
          <div className="field">
            <label htmlFor="fullName">Full Name</label>
            <input
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  fullName: e.target.value,
                }))
              }
              value={formData.fullName}
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
            />
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <input
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }))
              }
              value={formData.address}
              required
              type="text"
              name="address"
              id="address"
              placeholder="Address"
            />
          </div>
          <div className="field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  phoneNumber: e.target.value,
                }))
              }
              value={formData.phoneNumber}
              required
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              value={formData.description}
              required
              type="text"
              name="description"
              id="description"
            />
          </div>
          <div className="actions">
            {formData.lat === center.lat && formData.lng === center.lng && (
              <div className="mapError">
                Please select your location in map!
              </div>
            )}
            <button
              className="buttonStyle submitBtn"
              disabled={
                formData.lat === center.lat && formData.lng === center.lng
              }
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="location-container">
      {renderHeader()}
      <div className="information-container">
        {renderMap()}
        {renderForm()}
      </div>
    </div>
  );
};

export default SetLocation;
