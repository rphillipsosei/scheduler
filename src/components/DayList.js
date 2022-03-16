import React from "react";
import DayListItem from "components/DayListItem";

import "./DayList.scss";

//returns DayList view
export default function DayList({ days, day:value, onChange }) {
  return (
    <ul>
      {days.map((day) => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === value}
          setDay={onChange}
        />
      ))}
    </ul>
  );
}
