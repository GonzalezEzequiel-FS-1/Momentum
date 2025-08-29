import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "@mantine/core";

const MantineInput = ({ label, value, onChange, withAsterisk, description, required }) => {
  return (
    <>
      <label className="mb-1 font-semibold text-gray-300 flex items-center gap-1 select-none">
        {label}
        {withAsterisk && <span className="text-red-500 text-xl leading-none">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-sm italic text-gray-400 select-none">{description}</p>
      )}
      <TextInput
        type="text"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your task title..."
        styles={{
          input:{
            backgroundColor:"#00000050"
          }
        }}
       
      />
   </>
  );
};

MantineInput.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  withAsterisk: PropTypes.bool,
  required: PropTypes.bool
};

export default MantineInput;
