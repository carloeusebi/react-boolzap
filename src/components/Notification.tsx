import React, { useState } from "react";

const Notification = () => {
  const [state, setState] = useState(true);

  return (
    <div id="notifications">
      {state && (
        <div className="contact">
          <div className="avatar d-flex justify-center align-center">
            <i className="fa-solid fa-bell-slash fa-xl"></i>
          </div>
          <div>
            <p className="name">Receive new message notifications</p>
            <p
              onClick={() => setState(false)}
              className="activate-notification-btn"
            >
              Activate desktop notifications
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
