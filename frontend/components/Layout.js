import React from "react";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <p>Header is</p>
      {children}
      <p>Footer</p>
    </React.Fragment>
  );
};

export default Layout;
