import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Tweet from "../components/tweet/index";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Home() {
  const [api, setApi] = useState([]);
  const [keyword, setKeyword] = useState("govtech");
  const tweetsRef = useRef(null);
  useEffect(() => {
    const getData = async () => {
      const API = `https://puentech.herokuapp.com/api/v1/tweets/${keyword}?limit=10`;
      try {
        const data = await fetch(API).then((response) => response.json());
        setApi(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [keyword]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Scraper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography align="center" variant="h3" component="h1">
        Twitter Scraper
      </Typography>
      <section className={styles.selectTopic}>
        <Typography variant="h4" component="h2">
          {" "}
          Selecciona Un Tema
        </Typography>
        <Button
          onClick={() => setKeyword("govtech")}
          variant="contained"
          color="primary"
        >
          #GOVTECH
        </Button>
        <Button
          onClick={() => setKeyword("tech")}
          variant="contained"
          color="primary"
        >
          #TECH
        </Button>
        <Button
          onClick={() => setKeyword("facebook")}
          variant="contained"
          color="primary"
        >
          #FACEBOOK
        </Button>
      </section>
      <section ref={tweetsRef} className={styles.tweets}>
        {api.map((tweet) => (
          <Tweet key={tweet._id} {...tweet} />
        ))}
      </section>
    </div>
  );
}
