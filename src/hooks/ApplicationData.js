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
      const days = getDays(appointments);
      setState((prev) => ({ ...prev, appointments, days }));
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
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = getDays(appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
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

  //updates number of remaining appointment slots in a day
  const getDays = function (newAppts) {
    const newDays = [...state.days];
    return newDays.map((day) => {
      let newDay = { ...day };
      let spots = 0;
      for (let i = 0; i < newDay.appointments.length; i++) {
        let apptID = newDay.appointments[i];
        if (!newAppts[apptID].interview) {
          spots++;
        }
      }
      newDay.spots = spots;
      return newDay;
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
