import React from "react";
import PropTypes from "prop-types";

const UserIcon = ({ className, src, alt }) => {
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt || ""}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default UserIcon;

UserIcon.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,  
  alt: PropTypes.string,             
};


