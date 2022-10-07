import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./errorModal.module.css";

const Backdrop = ({ onCancleDelete }) => {
  return <div className={classes.backdrop} onClick={onCancleDelete} />;
};

const Modal = ({
  title,
  message,
  actionButton,
  cancleButton,
  onCancleDelete,
  onDeletePost,
}) => {
  return (
    <div className={classes.modal}>
      <header className={classes["header-error"]}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <footer className={classes.actions}>
        <button onClick={onDeletePost} className={classes.deleteBtn}>
          {actionButton}
        </button>
        <button onClick={onCancleDelete} className={classes.cancleBtn}>
          {cancleButton}
        </button>
      </footer>
    </div>
  );
};

const ErrorModal = ({
  actionButton,
  cancleButton,
  onDeletePost,
  onCancleDelete,
  title,
  message,
}) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCancleDelete={onCancleDelete} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          actionButton={actionButton}
          cancleButton={cancleButton}
          onDeletePost={onDeletePost}
          onCancleDelete={onCancleDelete}
          title={title}
          message={message}
        />,
        document.getElementById("modal-root")
      )}
    </Fragment>
  );
};

export default ErrorModal;
