import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import tweets from "./tweets.json";
import dayListItem from './components/DayListItem.js';

import "./styles.css";
import DayListItem from "./components/DayListItem.js";

function Tweet(props) {
  return(
    <article className="tweet">
    <header className="tweet__header">
      <img
        className="tweet__header-avatar"
        src={props.avatar}
        alt="User Avatar"
      />
      <h2 className="tweet__header-name">{props.name}</h2>
    </header>
    <main className="tweet__content">
      <p>{props.content}</p>
    </main>
    <footer className="tweet__footer">{props.date}</footer>
  </article>
  )
}

function TweetList(props) {
  const tweets = props.tweets.map(tweet => {
    return (
      <Tweet
        key={tweet.id}
        name={tweet.name}
        avatar={tweet.avatar}
        content={tweet.content}
        date={tweet.date}
      />
    );
  });

  return tweets;
}

const setDay = () => {
  console.log("I'm running");
}

ReactDOM.render(
  <Fragment>
    <TweetList tweets={tweets} />
    <DayListItem
      name="Monday"
      spots={5}
      selected={false}
      setDay={setDay}
    />
  </Fragment>,
  
  document.getElementById("root")
);