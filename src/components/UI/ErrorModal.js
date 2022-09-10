import React from "react";
import "./errorModal.css";

const ErrorModal = ({
  actionButton,
  cancleButton,
  onDeletePost,
  onCancleDelete,
  title,
  message,
}) => {
  return (
    <div>
      <div className="backdrop" />
      <div className="modal card-container">
        <header className="header-error">
          <h2>{title}</h2>
        </header>
        <div className="content">
          <p>{message}</p>
        </div>
        <footer className="actions">
          <button onClick={onDeletePost} className="buttonStyle deleteBtn ">
            {actionButton}
          </button>
          <button onClick={onCancleDelete} className="buttonStyle cancleBtn">
            {cancleButton}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ErrorModal;
