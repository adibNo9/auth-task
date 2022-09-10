import "./post.css";

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { id, address, lat, lng } = post;

  return (
    <div className="post-container">
      <div className="post-map">
        <MapContainer
          center={[lat, lng]}
          boxZoom={false}
          dragging={false}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={[lat, lng]} />
        </MapContainer>
      </div>
      <div className="info-container">
        <p className="address">
          <span className="addressKey">Address: </span>
          {address}
        </p>
      </div>
      <div className="button-container">
        <Link className="buttonStyle detailsBtn" to={`/${id}`}>
          More Details
        </Link>
      </div>
    </div>
  );
};

export default Post;
