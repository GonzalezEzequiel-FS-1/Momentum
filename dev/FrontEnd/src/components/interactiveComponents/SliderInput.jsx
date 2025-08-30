import React from "react";
import { Slider } from "@mantine/core";
import PropTypes from "prop-types";

const SliderInput = ({ label, value, onChange, icon, withAsterisk, description }) => {
  const getTrackColor = (val) => {
    if (val >= 80) return "#e03e3e";      // Red
    if (val >= 60) return "#f5c518";      // Yellow
    return "#228be6";                     // Blue
  };

  const trackColor = getTrackColor(value);

  return (
    <>
      <label className="mb-1 font-semibold text-gray-300 flex items-center gap-1 select-none">
        {label}
        {withAsterisk && <span className="text-red-500 text-xl leading-none">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-sm italic text-gray-400 select-none">{description}</p>
      )}
      <Slider
        thumbChildren={icon}
        label={null}
        defaultValue={0}
        thumbSize={26}
        value={value}
        onChange={onChange}
        styles={{
          thumb: {
            padding: 3,
            backgroundColor: trackColor,
            border: "2px solid #FFFFFF50",
            color: "white",
            transition: "background-color 0.5s ease", // Smooth transition for thumb
          },
          bar: {
            backgroundColor: trackColor,
            transition: "background-color 0.5s ease", // Smooth transition for filled bar
          },
        }}
      />
    </>
  );
};

SliderInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  withAsterisk: PropTypes.bool,
};

SliderInput.defaultProps = {
  icon: null,
  withAsterisk: false,
};

export default SliderInput;
