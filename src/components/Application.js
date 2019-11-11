import React, { useState } from "react";
import "components/Application.scss";
import DayList from './DayList';
import Appointment from './Appointment';

const appointments = [

  {
    id: 2,
    time: "10am",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "11am",
    interview: {
      student: "George Harrison",
      interviewer: {
        id: 1,
        name: "Brian Epstein",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 1,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "John Lennon",
      interviewer: {
        id: 1,
        name: "George Martin",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 1,
    time: "5pm",
  },
];

export default function Application(props) {

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  const [day, setDay] = useState('Monday');

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {
          appointments.map((appointment) => (
            <Appointment key={appointment.id} {...appointment} />
          ))
        }
      </section>
    </main>
  );
}
