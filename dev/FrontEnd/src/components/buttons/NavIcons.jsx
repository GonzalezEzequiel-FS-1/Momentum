import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavIcons = ({ icon, onClick, navLink }) => {
  const nav = useNavigate();
  const handleClick = ()=>{
    if(onClick){onClick()}
    if(navLink){nav(navLink)}
  }
  return (
    <div
      onClick={handleClick}
      className="hover:text-stone-700 transition-all duration-500 ease-in-out text-5xl"
    >
      {icon}
    </div>

  );
};

export default NavIcons;

NavIcons.propTypes = {
  icon: PropTypes.node.isRequired,        // React element like <Icon />
  onClick: PropTypes.func,                // Optional custom behavior
  navLink: PropTypes.string,              // Optional route path
};
