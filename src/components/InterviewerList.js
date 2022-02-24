import React from "react";
import InterviewerListItem from "components/InterviewerListItem"

import "./InterviewerList.scss";

export default function InterviewerList(props, value, onChange) {
console.log("interviewList:", props)

 
    
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"> {

 
 props.interviewers.map(interviewer => 
          <InterviewerListItem
            key = {interviewer.id}
            name = {interviewer.name}
            avatar = {interviewer.avatar}
            selected = {interviewer.id === value}
            setInterviewer={() => onChange(props.id)}
          />
        )
      }
  </ul>
</section>
)

}