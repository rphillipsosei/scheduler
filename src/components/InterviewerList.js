import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "./InterviewerList.scss";
import PropTypes from 'prop-types'

export default function InterviewerList(props) {
   
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"> 


 { props.interviewers.map(interviewer => 
          <InterviewerListItem
            key = {interviewer.id}
            name = {interviewer.name}
            avatar = {interviewer.avatar}
            selected = {interviewer.id === props.interviewer}
            setInterviewer = {() => props.onChange(interviewer.id)}
          />
        )
      }
      
      
  </ul>
</section>
)

}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
