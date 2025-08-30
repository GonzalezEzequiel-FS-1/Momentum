import React from 'react';
import { SegmentedControl } from '@mantine/core';
import PropTypes from 'prop-types';

const SegmentedControlNew = ({ label, description, value, onChange, data, withAsterisk }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-semibold text-white">
          {label} {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}
      {description && (
        <p className="text-sm text-gray-400 mb-2">{description}</p>
      )}
      <SegmentedControl
        styles={{
          
            indicator:{
                backgroundColor:"#2564eb",
                padding:".2rem"
            },root:{
                backgroundColor:"#00000050",
                border: "0.25px solid #228be650",
                
            },
            label:{
              fontSize:".75rem"
              
            }
        }}
        value={value}
        onChange={onChange}
        data={data}
        radius="md"
        size="md"
        fullWidth
      />
    </div>
  );
};

export default SegmentedControlNew;


SegmentedControlNew.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  withAsterisk: PropTypes.bool,
};