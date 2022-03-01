import React, { useState } from "react";
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"


export default function Form(props) {

    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    const reset = () => {
      setStudent("")
      setInterviewer("") 
    }  

    const cancel = () => {
      reset()
      props.onCancel()
    }

      return (

        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder={props.student}
              value={student}
              onChange={(event) => setStudent(event.target.value)}
              />
          </form>
          <InterviewerList 
          interviewer={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>Cancel</Button>
            <Button confirm onClick={(event) => props.onSave(student, interviewer)}>Save</Button>
          </section>
        </section>
      </main>
        
    )
}