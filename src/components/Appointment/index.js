import React from "react";
import "./Appointment.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty";

export default function Appointment(props) {
    console.log("index props", props)
  return (
    <article className="appointment">
      <Header time="12pm" />
      {props.interview? <Show interviewer={props.interview.interviewer}/>:<Empty />}
  </article>
  );
}
