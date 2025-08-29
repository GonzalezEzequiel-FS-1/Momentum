import React from "react";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import PropTypes from "prop-types";

export default function Demo({ placeholder }) {
  const [value, setValue] = useState();
  return (
    <DatePickerInput

      placeholder={placeholder}
      value={value}
      onChange={setValue}
    />
  );
}

Demo.propTypes={
  placeholder: PropTypes.String
}