import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
  });

  function setDay(day) {
    return setState((prev) => ({
      ...prev,
      day,
    }));
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then((resp) => {
        setState({
            ...state,
            appointments,
        });
    });
    }

function cancelInterview(id) {
    const appointment = {
        ...state.appointments[id],
        interview: null,
    };
    const appointments = {
        ...state.appointments,
        [id]: appointment,
        
    };
    return axios
    .delete(`/api/appointments/${id}`)
    .then(() => setState({ ...state, appointments }));
}
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);


  const countSpots = (state, day) => {
    const currentDay = state.days.find((dayItem) => dayItem.name === day);
    const appointmentIds = currentDay.appointments;
  
    const interviewsForTheDay = appointmentIds.map(
      (id) => state.appointments[id].interview
    );
  
    const emptyInterviewsForTheDay = interviewsForTheDay.filter((interview) => !interview);
    const spots = emptyInterviewsForTheDay.length;
  
    return spots;
  };

  return { state, setDay, bookInterview, cancelInterview, countSpots };

};