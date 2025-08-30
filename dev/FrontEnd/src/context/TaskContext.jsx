import PropTypes from "prop-types";
import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag(prev => !prev);

  return (
    <TaskContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes={
    children: PropTypes.node
}