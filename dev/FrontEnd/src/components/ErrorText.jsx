import PropTypes from "prop-types";
import React from "react";

const ErrorText = ({ errMess }) => {
  return (
    <>
      <p className="text-bold text-red-500 text-2xl">{errMess}</p>
    </>
  );
};

export default ErrorText;

ErrorText.propTypes={
  errMess: PropTypes.String
}