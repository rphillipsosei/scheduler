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


export function getInterviewersForDay(state, day) {
  const result = [];
  const dayFilter = state.days.filter((days) => days.name === day)

  if (!dayFilter[0]) return result;
  for (const element of dayFilter[0].interviewers) {
    result.push(state.interviewers[element]);
  }
  
  return result;
};




export function getInterview(state, interview) {
  
   if (!interview) {
    return null;
  }
   return {
    student: interview.student, 
    interviewer: state.interviewers[interview.interviewer]
  }
}



