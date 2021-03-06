export const getAppointmentsForDay = (state, day) => {
  
  const appointmentsThatDay = [];

  // For each day, check to see if its name matches the given day name
  state.days.forEach((dayOfWeek) => {

    // If it does match
    if (dayOfWeek.name === day) {

      // Iterate over all appointments on that day and 
      // push them into the array to be returned
      dayOfWeek.appointments.forEach((apptId) => {
        appointmentsThatDay.push(state.appointments[apptId]);
      })
    }
    
  });
 
  return appointmentsThatDay.length ? appointmentsThatDay : [];

};

export const getInterviewersForDay = (state, day) => {
  
  // Same logic as for appointments
  const interviewersForDay = [];

  state.days.forEach((dayOfWeek) => {

    if (dayOfWeek.name === day) {

      dayOfWeek.interviewers.forEach((interviewerId) => {
        interviewersForDay.push(state.interviewers[interviewerId]);
      })
    }
    
  });
 
  return interviewersForDay.length ? interviewersForDay : [];

}

export const getInterview = (state, interview) => {

  if (interview) {

    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }    

  } else {

    return null;

  }
};