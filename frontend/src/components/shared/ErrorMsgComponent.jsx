import React from "react";

const ErrorMsgComponent = ({ msg }) => {
  if (msg&&msg.length > 0) {
    return (
      <p className="mt-2 text-sm text-red-600" id="username-error">
        {msg}
      </p>
    );
  }
  return <></>;
};

export default ErrorMsgComponent;
