import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const tweet = ({ _id }) => {
  const options = {
    cards: "hidden",
    align: "center",
    // width: "33%",
    conversation: "none",
  };
  return <TwitterTweetEmbed options={options} tweetId={_id} />;
};

export default tweet;
