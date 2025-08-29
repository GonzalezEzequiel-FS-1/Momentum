import { TextInput } from "@mantine/core";
import React from "react";
import PropTypes from "prop-types";
const InputField = ({ value, type, onChange, placeholder, label, ...props}) => {
  return (
    <TextInput
      type={type}
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

export default InputField;


InputField.propTypes ={
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string
}