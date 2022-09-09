import React, { useState, useMemo, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "./setLocation.css";

const center = {
  lat: 35.699736,
  lng: 51.338061,
};

const SetLocation = ({ onAddNewPost }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    description: "",
    lat: undefined,
    lng: undefined,
  });
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    onAddNewPost(formData);

    navigate("/");
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setFormData((prevState) => ({
            ...prevState,
            lat: marker._latlng.lat,
            lng: marker._latlng.lng,
          }));
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <div className="location-container">
      <div className="cardHeader">
        <h1 className="ui header">Set Your Location</h1>
        <p>
          set your location in the app to show to another users, Click on Marker
          location and drag it.
        </p>
      </div>
      <div className="information-container">
        <div className="map-container">
          <MapContainer
            center={[35.689198, 51.388973]}
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
              <button
                className="ui button"
                disabled={!formData.lat && !formData.lng}
                type="submit"
              >
                Submit
              </button>
              {!formData.lat && !formData.lng && (
                <div className="mapError">
                  Please select your location in map!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetLocation;
