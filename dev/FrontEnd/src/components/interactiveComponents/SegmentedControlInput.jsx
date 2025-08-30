import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const CustomSegmentedControl = ({ label, value, onChange, data, withAsterisk, description }) => {
  const containerRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const buttons = containerRef.current.querySelectorAll("button");
    const selectedIndex = data.findIndex((d) => d.value === value);

    if (buttons[selectedIndex]) {
      const button = buttons[selectedIndex];
      setHighlightStyle({
        width: button.offsetWidth,
        left: button.offsetLeft,
      });
    }
  }, [value, data]);

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <label className="mb-1 font-semibold text-gray-300 flex items-center gap-1 select-none">
        {label}
        {withAsterisk && <span className="text-red-500 text-xl leading-none">*</span>}
      </label>
      {description && (
        <p className="mb-2 text-sm italic text-gray-400 select-none">{description}</p>
      )}
      <div
        ref={containerRef}
        className="relative inline-flex rounded-md border border-gray-600 overflow-hidden select-none w-full"
        role="radiogroup"
        aria-label={label}
      >
        {/* Sliding highlight */}
        <div
          className="absolute top-0 bottom-0 bg-blue-600 rounded-md shadow-md transition-all duration-300 ease-in-out"
          style={{
            width: highlightStyle.width,
            left: highlightStyle.left,
          }}
        />

        {/* Buttons */}
        {data.map(({ label: itemLabel, value: itemValue }) => (
          <button
            key={itemValue}
            type="button"
            role="radio"
            aria-checked={value === itemValue}
            tabIndex={value === itemValue ? 0 : -1}
            onClick={() => onChange(itemValue)}
            className={`relative z-10 flex-1 px-4 py-2 focus:outline-none select-none
              ${
                value === itemValue
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            {itemLabel}
          </button>
        ))}
      </div>
    </div>
  );
};

CustomSegmentedControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  withAsterisk: PropTypes.bool,
};

export default CustomSegmentedControl;
