import PropTypes from "prop-types";
import React from "react";

const Divider = ({
  width = "w-[1px]",
  height = "h-8",
  color = "bg-stone-400",
  margin = "m-0",
}) => {
  return <div className={`${width} ${height} ${color} ${margin} rounded`} />;
};

export default Divider;

Divider.propTypes={
  width: PropTypes.String,
  height: PropTypes.String,
  color: PropTypes.String,
  margin: PropTypes.String
}