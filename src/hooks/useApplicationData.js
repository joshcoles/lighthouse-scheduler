import { useState, useEffect, useReducer, dispatch } from "react";
import axios from 'axios';
import { actions } from "@storybook/addon-actions";

export default function useApplicationData(initial) {

  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';

  const reducer = (state, action) => {
    
    switch(action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
        break;
      case SET_APPLICATION_DATA:
        return {
          ...state, 
          days: action.days,
          appointments: action.appointments,
          interviewers: actions.interviewers
        };
        break;
      case SET_INTERVIEW:
        // return;
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, 0);

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: [],
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day });
  const setDay = day => dispatch({ type: SET_DAY, day })

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {

      let days = all[0].data;
      let appointments = all[1].data;
      let interviewers = all[2].data;

      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });

      // setState(prev => ({ 
      //   ...prev, 
      //   days: all[0].data,
      //   appointments: all[1].data,
      //   interviewers: all[2].data
      // }));
      
    });
  }, []);

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    dispatch({ type: SET_INTERVIEW, id, interview });

    // setState({
    //   ...state, 
    //   appointments
    // });

    return axios.put(`/api/appointments/${id}`, { interview: interview });
  
  }
  
  const cancelInterview = (id) => {

    const appointments = { ...state.appointments };

    appointments[id].interview = null;


    dispatch({ type: SET_INTERVIEW, id, interview: null });
    // setState({
    //   ...state, 
    //   appointments
    // });

    return axios.delete(`/api/appointments/${id}`);
    
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}