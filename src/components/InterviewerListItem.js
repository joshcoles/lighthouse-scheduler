import React from 'react';
import './InterviewerListItem.scss';
import classnames from 'classnames';

export default function InterviewerListItem(props) {

  console.log("props.selected: ", props.selected)
  const itemClass = classnames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected
  });

  return (
    <li className={itemClass} selected={props.selected} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}