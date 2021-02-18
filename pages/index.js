import React, { useState, useCallback, useRef } from "react";
import useQueryTweets from "../utils/useQueryTweets";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Tweet from "../components/tweet/index";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Home() {
  const [keyword, setKeyword] = useState("govtech");
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, tweets, hasMore } = useQueryTweets(
    keyword,
    pageNumber,
    setPageNumber
  );
  const observer = useRef();
  const lastTweetElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div>
      <Head>
        <title>Twitter Scraper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography
        className={styles.title}
        align="center"
        variant="h3"
        component="h1"
        paragraph={true}
      >
        Twitter Scraper
      </Typography>
      <section className={styles.selectTopic}>
        <Typography variant="h4" component="h2">
          {" "}
          Selecciona un tema
        </Typography>
        <Typography
          className={styles.description}
          color="primary"
          variant="body1"
          component="p"
          paragraph={true}
        >
          Las etiquetas definen los tweets que verás. Por defecto se selecciona
          la etiqueta #GOVTECH, por lo que veras tweets que contengan la palabra
          govtech o el hashtag #govtech
        </Typography>
        <Button
          onClick={() => setKeyword("govtech")}
          variant="contained"
          color={keyword === "govtech" ? "secondary" : "primary"}
        >
          #GOVTECH
        </Button>
        <Button
          onClick={() => setKeyword("tech")}
          variant="contained"
          color={keyword === "tech" ? "secondary" : "primary"}
        >
          #TECH
        </Button>
        <Button
          onClick={() => setKeyword("facebook")}
          variant="contained"
          color={keyword === "facebook" ? "secondary" : "primary"}
        >
          #FACEBOOK
        </Button>
        <Button
          onClick={() => setKeyword("whatsapp")}
          variant="contained"
          color={keyword === "whatsapp" ? "secondary" : "primary"}
        >
          #WHATSAPP
        </Button>
      </section>
      <section className={styles.tweets}>
        {tweets.map((tweet, index) => {
          if (tweets.length === index + 1) {
            return (
              <div
                className={styles.tweetContainer}
                key={tweet._id}
                ref={lastTweetElementRef}
              >
                <Tweet {...tweet} />
              </div>
            );
          } else {
            return (
              <div className={styles.tweetContainer} key={tweet._id}>
                <Tweet {...tweet} />
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </section>
    </div>
  );
}
