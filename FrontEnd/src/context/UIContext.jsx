import React from "react";
// Importing core React functionality
import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";



// 1. Create the context object with default values
const TaskContext = createContext({
  isVisible: false,             // [State Modeling] A boolean flag to show/hide the UI (e.g., modal or popover)
  toggleVisibility: () => {},   // [Functional Stub] A default empty function — prevents runtime errors
});


export const useTaskUI = () => useContext(TaskContext);


export const UIProvider = ({ children }) => {


  const [isVisible, setIsVisible] = useState(false);
  const [traitsVisible, setTraitsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const closeVisibility = () => {
    setIsVisible(false);
  };

  const openTraitVisibility = () => setTraitsVisible(true);
    const toggleTraitVisibility = () => {
    setTraitsVisible((prev) => !prev);
  };

  const closeTraitVisibility = () => {
    setTraitsVisible(false);
  };

  return (
    <TaskContext.Provider value={{ isVisible, traitsVisible, toggleVisibility, toggleTraitVisibility, openTraitVisibility, closeVisibility, closeTraitVisibility }}>
      {children}
    </TaskContext.Provider>
  );
};

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
