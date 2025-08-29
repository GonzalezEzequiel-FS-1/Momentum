import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Text } from '@mantine/core';


const SliderForUserCreation = ({ question, marks, value, onChange, thumbChildren, thumbSize }) => {
  // thumbChildren is a React component here (e.g. LuWeight), not an element
  const Icon = thumbChildren;

  return (
    <>
      <Text size="xl">{question}</Text>
      <Slider
        size="xl"
        value={value}
        onChange={onChange}
        min={1}
        max={10}
        step={1}
        color="none"
        marks={marks}
        thumbChildren={Icon ? <Icon size={thumbSize || 26} /> : null}
        thumbSize={thumbSize || 26}
        label={(val) => {
          const found = marks.find((mark) => mark.value === val);
          return typeof found?.label === 'string' ? found.label : null;
        }}
        styles={{
          track: {backgroundColor:'transparent'},
          markLabel: { display: 'none' },
          root: { marginTop: '1rem', width: '100%' },
          thumb: {
            borderColor: '#00000000',
            color:'#1871c1',            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          trackContainer: {
            backgroundColor: '#00000000',
          },
          mark:{
            color:'#1871c150',
            backgroundColor:'#1871c150'
          }
        }}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
    </>
  );
};

SliderForUserCreation.propTypes = {
  question: PropTypes.string.isRequired,
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  thumbChildren: PropTypes.elementType,
  thumbSize: PropTypes.number,
};

export default SliderForUserCreation;
