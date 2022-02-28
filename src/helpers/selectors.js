export function getAppointmentsForDay(state, day) {
 
  if(!state.days){
    return [];
  }
  let dayFilter = state.days.filter(days => days.name === day)[0];
  if(!dayFilter){
    return [];
  }
  let result = [];
  for(const id of dayFilter.appointments){
    const apptState = state.appointments[id];
    result.push(apptState);
  }

  return result;
}


