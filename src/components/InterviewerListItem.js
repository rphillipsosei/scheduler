import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewListItem() {
     function showName() {
        if(props.selected) {
          return {avatar}  
        }
    }
    
    const interviewerClass = classNames(
        "interviewers__item", {
            "interviewers__item--selected" : selected && {showName()}
        }
    )
    
   

    return (
        <li className="interviewers__item" onClick={() => props.setInterviewer(interviewer.id)}> 
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  Sylvia Palmer
</li>



    )
}