import React from "react";

const Error = ({ messageInvalid }) => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "0.25rem",
        fontSize: "80%",
        color: "#fb6340",
      }}
    >
      {messageInvalid}
    </div>
  );
};

export default Error;
