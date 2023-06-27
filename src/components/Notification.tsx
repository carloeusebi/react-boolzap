import React from "react";

const Notification = () => {
  return (
    <div id="notifications">
      <div className="contact">
        <div className="avatar d-flex justify-center align-center">
          <i className="fa-solid fa-bell-slash fa-xl"></i>
        </div>
        <div>
          <p className="name">Receive new message notifications</p>
          <p className="activate-notification-btn">
            Activate desktop notifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
