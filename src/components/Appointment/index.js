import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';

export default function Appointment(props) {

  // Each constant to be used to flag a different state when rendering components below
  // Note that different constants can be used for the same component but in a different way
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  // Import custom hooks that help flag
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);


  // Fired on click to 'Confirm' on Form component
  const save = (name, interviewer) => {  
    
    transition(SAVING); 

    const interview = {
      student: name,
      interviewer
    };

    // Hit API with updated interview then transition to show update
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  const edit = () => transition(EDIT);
  const cancel = () => transition(CONFIRM);


  const confirmDelete = () => {

    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      });
  }

  const cancelDelete = () => {
    back();
  }

  return (
    <div className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={cancel}
          onSave={save}
          />
      )}
      
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?" 
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={cancel}
          onSave={save}
          editing={true}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
        />
      )}

    </div>
  )
}