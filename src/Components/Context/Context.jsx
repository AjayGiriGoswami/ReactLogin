import React, { createContext, useState } from "react";

export const LoginContext = createContext("");

const Context = ({ children }) => {
  const [users, setUsers] = useState();
  return (
    <LoginContext.Provider value={{ users, setUsers }}>
      {children}
    </LoginContext.Provider>
  );
};

export default Context;
