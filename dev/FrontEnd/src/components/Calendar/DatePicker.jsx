import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes from "prop-types";

const localizer = momentLocalizer(moment);

const DatePicker = ({ events = [], onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempEvents, setTempEvents] = useState([]);

  const handleSlotSelect = (slotInfo) => {
    const newEvent = {
      title: "Selected Slot",
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: slotInfo.action === "select",
    };

    setTempEvents([newEvent]);
    setSelectedDate(slotInfo.start);
    onDateSelect?.(slotInfo.start);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded shadow-lg p-4">
        <Calendar
          view="week"
          defaultView="week"
          views={["month", "week", "day"]}
          defaultDate={new Date()}
          selectable
          localizer={localizer}
          events={[...events, ...tempEvents]}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSlotSelect}
          style={{ height: 500 }}
        />
      </div>
      {selectedDate && (
        <p className="text-sm text-stone-600 mt-2">
          Selected: {moment(selectedDate).format("dddd, MMMM Do YYYY, h:mm A")}
        </p>
      )}
    </div>
  );
};

export default DatePicker;

DatePicker.propTypes={
  events: PropTypes.array,
  onDateSelect: PropTypes.func
}