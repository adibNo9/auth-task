import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './setLocation.css';

const center = {
  lat: 35.699736,
  lng: 51.338061,
}; 

const SetLocation = () => {
     const [draggable, setDraggable] = useState(false);
     const [position, setPosition] = useState(center);
     const markerRef = useRef(null);
     console.log(position);
     const eventHandlers = useMemo(
       () => ({
         dragend() {
           const marker = markerRef.current;
           if (marker != null) {
             setPosition(marker.getLatLng());
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
                    ? 'Marker is draggable'
                    : 'Click here to make marker draggable'}
                </span>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="form-container">
          <form className="ui form">
            <h4 class="ui dividing header">Your Information</h4>
            <p>NOTICE: First select your location in the map.</p>
            <div className="field">
              <label>Full Name</label>
              <input />
            </div>
            <div className="field">
              <label>Address</label>
              <input />
            </div>
            <div className="field">
              <label>City</label>
              <input />
            </div>
            <div className="field">
              <label>Your Phone Number</label>
              <input />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea />
            </div>
            <button className="ui button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetLocation;