export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }
  let dayFilter = state.days.filter((days) => days.name === day)[0];
  if (!dayFilter) {
    return [];
  }
  let result = [];
  for (const id of dayFilter.appointments) {
    const apptState = state.appointments[id];
    result.push(apptState);
  }

  return result;
}

const interviewers = {
  "1": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
  }
}


export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }
   return {
    student: interview.student, 
    interviewer: state.interviewers[interview.interviewer]
  }
}
