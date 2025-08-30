import React from "react";
import { Button } from "@mantine/core";
import PropTypes from "prop-types";

const ButtonComponent = ({ text,  onClick, ...props }) => {
  return (
    <Button
      fullWidth
      {...props}
      autoContrast
      
      // aria-label={ariaLabel}
      onClick={onClick}
    >
      {text}
      {/* {text ? (
        <span>{text}</span>
      ) : (
        <span className="sr-only">{ariaLabel}</span>
      )} */}
    </Button>
  );
};

export default ButtonComponent;
ButtonComponent.propTypes={
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func

}