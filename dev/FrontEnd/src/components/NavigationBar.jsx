import React from "react";
import { useAuth } from "../context/AuthContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import NavIcons from "./buttons/NavIcons";
import { useTaskUI } from "../context/UIContext";
import { useNavigate } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";

const NavigationBar = () => {
  const { toggleVisibility, isVisible, traitsVisible } = useTaskUI();
  const { isLogged } = useAuth();
  
  const nav = useNavigate();

  if (!isLogged) return null;

  const hoverEffectSM =
    "hover:text-stone-700 transition-all duration-500 ease-in-out text-5xl";

  return (
    <>
      {!isVisible && !traitsVisible && (
        <nav className="transition-all duration-500 ease-in-out min-w-[400px] max-w-[800px] w-10/12 rounded-xl h-20 mt-2 bg-stone-200 flex items-center justify-around  bg-opacity-100 z-50">
          <NavIcons navLink="/home" icon={<IoHomeOutline />} />
          <NavIcons navLink="/profile" icon={<FaUser />} />

          <div className="bg-stone-200 bg-opacity-90 rounded-full h-24 w-24 -mt-0 flex items-center justify-center relative">
            <IoIosAddCircleOutline
              onClick={toggleVisibility}
              className={`text-9xl text-black ${hoverEffectSM}`}
            />
          </div>

          <NavIcons
            
            icon={<BsGraphUp onClick={()=>nav('/statpage')} className={hoverEffectSM} />}
          />
          <NavIcons
            onClick={() => nav('/alltasks')}
            icon={<FaRegCalendarAlt className={hoverEffectSM} />}
          />
        </nav>
      )}
    </>
  );
};

export default NavigationBar;
