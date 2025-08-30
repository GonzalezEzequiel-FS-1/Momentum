import React from "react";
import { useState, useEffect } from "react";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DatePickers = () => {
  const [day, setDay] = useState("");
  const [dayName, setDayName] = useState("");

  useEffect(() => {
    const now = new Date();
    setDay(now.getDate());
    setDayName(weekDays[now.getDay()]);
  }, []);

  return (
    <button className="py-3 px-5 rounded-xl bg-slate-50 hover:bg-stone-200 flex flex-col items-center justify-around transition-colors duration-300 shadow-lg shadow-slate-900">
      <h1 className=" font-extralight text-stone-700 group-hover:text-white text-2xl">
        {dayName}
      </h1>
      <h1 className="text-stone-700 group-hover:text-white text-6xl mb-4 font-black">
        {day}
      </h1>
      <div className="w-3/5 h-1 rounded-xl bg-black"></div>
    </button>
  );
};

export default DatePickers;
