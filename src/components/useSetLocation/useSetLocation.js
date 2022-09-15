import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useSetLocation = (token, onAddNewPost, center) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const [formData, setFormData] = useState({
    author: token,
    fullName: "",
    address: "",
    phoneNumber: "",
    description: "",
    lat: center.lat,
    lng: center.lng,
  });

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

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

  return {
    toggleDraggable,
    eventHandlers,
    submitHandler,
    draggable,
    position,
    markerRef,
    setFormData,
    formData,
    navigate,
  };
};
