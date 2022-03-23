import React from "react";

const HelperText = ({ message }) => {
  return message !== "" ? (
    <p style={{ fontSize: 12 }} className="text-danger mb-3">
      {message}
    </p>
  ) : null;
};

export default HelperText;
