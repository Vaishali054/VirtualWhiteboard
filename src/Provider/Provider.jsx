import React, { createContext, useContext, useState } from "react";

const WhiteboardContext = createContext();

export const useWhiteboard = () => {
  return useContext(WhiteboardContext);
};

export const WhiteboardProvider = ({ children }) => {
  const [clearScreen, setClearScreen] = useState(false);

  const clearWhiteboard = () => {
    setClearScreen(true);
  };

  const resetClearScreen = () => {
    setClearScreen(false);
  };

  return (
    <WhiteboardContext.Provider value={{ clearScreen, clearWhiteboard, resetClearScreen }}>
      {children}
    </WhiteboardContext.Provider>
  );
};
