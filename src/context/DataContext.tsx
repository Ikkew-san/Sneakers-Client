import React, { createContext, useContext } from "react";

const DataContext = createContext({});

type DataContextProvider = {
  children: React.ReactNode;
};

export const DataContextProvider = ({ children }: DataContextProvider) => {
  return <DataContext.Provider value={}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
