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