import React from "react";
import "./Appointment.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import Confirm from "./Confirm"
import Status from "./Status"
import Error from "./Error";
// import getInterviewersForDay from "helpers/selectors";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETING = "ERROR_DELETING"

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
        transition(ERROR_SAVE, true)
        console.error(err);
      });
  
  }

  function deleteAppt(){
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((err) => {
      transition(ERROR_DELETING, true)
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
          onEdit={() => transition(EDIT)}
          onDelete={() => transition (CONFIRM)}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview || ""}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === DELETING && (
        <Status 
        message="Deleting..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
        onCancel={back}
        onConfirm={deleteAppt}
        message="Are you sure you want to delete this appointment?"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="Error saving appointment"
        onClose={() => back()}
        />
      )}
       {mode === ERROR_DELETING && (
        <Error
        message="Error deleting appointment"
        onClose={() => back()}
        />
      )}
    </article>
  );
}
