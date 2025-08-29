import React from "react";

const PrivateRoutes = () => {
  const userlogged = (e) => {
    e.preventDefault();
    //console.log(isLogged);
  };
  return <button className="border-slate-200 border-l text-slate-200" onClick={userlogged}>Is User Logged</button>;
};

export default PrivateRoutes;

