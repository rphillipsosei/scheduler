import React from "react";
import DayListItem from "components/DayListItem"

// import "./DayList.scss";

export default function DayList({days, daysProp, setDay}) {
    return (
        <ul>
          {days.map(day => (
            <DayListItem
              key={day.id}
              name={day.name}
              spots={day.spots}
              selected={day.name === daysProp}
              setDay={setDay}
            />
          ))}
          </ul>
              )
        }