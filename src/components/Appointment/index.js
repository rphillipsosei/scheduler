import React from "react";
import "./Appointment.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import getInterviewersForDay from "helpers/selectors";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const EDIT = "EDIT";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    
    props.bookInterview(props.id, interview).then(() => {
        transition(SHOW)
    })
    .catch((err) => {
        alert("There was an error adding your appointmnent");
        console.error(err);
      });
  
  }

  return (
    <article className="appointment">
      <Header time="12pm" />
     

      {mode === EMPTY && <Empty onAdd={() => transition(EDIT)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview || ""}
          interviewer={props.interview}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}
