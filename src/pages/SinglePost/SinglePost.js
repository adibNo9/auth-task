import "./singlePost.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useSetLocation } from "../../components/useSetLocation/useSetLocation";
import ErrorModal from "../../components/UI/ErrorModal";

const center = {
  lat: 35.699736,
  lng: 51.338061,
};

const SinglePost = ({ onAddNewPost, isUserLoggedIn }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const params = useParams();
  const {
    markerRef,
    setFormData,
    formData,
    toggleDraggable,
    eventHandlers,
    draggable,
    navigate,
  } = useSetLocation(null, {
    lat: center.lat,
    lng: center.lng,
  });

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        `http://localhost:3001/posts/${params.postId}`
      );

      const data = await response.json();
      setFormData(data);
    };
    getPost();
  }, [params.postId, setFormData]);

  const askForDeleteHandler = () => {
    setShowPopup(true);
  };

  const cancleDeleteHandler = () => {
    setShowPopup(false);
  };

  const deleteHandler = async () => {
    await fetch(`http://localhost:3001/posts/${params.postId}`, {
      method: "DELETE",
    });

    onAddNewPost({ fullName: "" });
    navigate("/", { replace: true });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/posts/${params.postId}`, {
      method: "Put",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    onAddNewPost(formData);
    setEditMode(false);
  };

  return (
    <div className="pageContainer">
      {showPopup && (
        <ErrorModal
          actionButton="Delete"
          cancleButton="cancle"
          onDeletePost={deleteHandler}
          onCancleDelete={cancleDeleteHandler}
          title="Delete Post"
          message="Are you sure for delete post?"
        />
      )}
      <div className="cardHeader">
        <h1 className="ui header">Single Post</h1>
        <p>
          set your location in the app to show to another users, Click on Marker
          location and drag it.
        </p>
      </div>
      <div className="information-container">
        {isUserLoggedIn && (
          <div className="actions-container">
            <button
              className="edit-btn buttonStyle"
              onClick={() => setEditMode(!editMode)}
            >
              Edit <i className="edit icon"></i>
            </button>
            <button
              onClick={askForDeleteHandler}
              className="delete-btn buttonStyle"
            >
              Delete<i className="trash alternate outline icon"></i>
            </button>
          </div>
        )}
        <div className="map-container">
          <MapContainer
            center={[formData.lat, formData.lng]}
            zoom={12}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
              draggable={editMode ? draggable : false}
              eventHandlers={eventHandlers}
              position={[formData.lat, formData.lng]}
              ref={markerRef}
            >
              {editMode && (
                <Popup minWidth={90}>
                  <span onClick={toggleDraggable}>
                    {draggable
                      ? 'Marker is draggable'
                      : 'Click here to make marker draggable'}
                  </span>
                </Popup>
              )}
            </Marker>
          </MapContainer>
        </div>

        <div className="form-container">
          {editMode ? (
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
                  className="buttonStyle submitBtn"
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
          ) : (
            <div className="post-details-container">
              <h3 className="ui dividing header">
                <span className="headerSpan">Username: </span>{' '}
                {formData.fullName}
              </h3>
              <h4>
                <span className="detailSpan">Address: </span> {formData.address}
              </h4>
              <h5>
                <span className="detailSpan">Phone Number: </span>{' '}
                {formData.phoneNumber}
              </h5>
              <p>
                <span className="descriptionSpan">Description: </span>{' '}
                {formData.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
