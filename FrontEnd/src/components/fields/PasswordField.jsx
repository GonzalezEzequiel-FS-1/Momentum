import { PasswordInput } from "@mantine/core";
import React from "react";
import PropTypes from "prop-types";
const PasswordField = ({ value, onChange, placeholder, label, ...props}) => {
  return (
    <PasswordInput
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      label={label}
      {...props}
      styles={{
        input:{
          backgroundColor:"#00000050"
        }
      }}
    />
  );
};

export default PasswordField;


PasswordField.propTypes ={
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string
}