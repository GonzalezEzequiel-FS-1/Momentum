import React from "react";
import { DateTimePicker } from "@mantine/dates";
import PropTypes from "prop-types";

const DateTimePickerComponent = ({ description, label, value, onChange, withAsterisk }) => {
  return (
    <div className="w-full text-white text-center">
      <label className="mb-1 font-semibold text-gray-300 flex items-center gap-1 select-none">
        {label}
        {withAsterisk && <span className="text-red-500 text-xl leading-none">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-sm italic text-gray-400 select-none">{description}</p>
      )}
      <DateTimePicker
        withAsterisk={withAsterisk}
        styles={{
          input: {
            backgroundColor: "#00000050",
            border: "0.25px solid #228be650"
          }
        }}
        placeholder="Pick a Date and Time"
        clearable
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

DateTimePickerComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  withAsterisk: PropTypes.bool,
  description: PropTypes.string,
};

export default DateTimePickerComponent;
