import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Home() {
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
        <Button variant="contained" color="primary">
          #GOVTECH
        </Button>
        <Button variant="contained" color="primary">
          #TECH
        </Button>
        <Button variant="contained" color="primary">
          #FACEBOOK
        </Button>
      </section>
      <section className={styles.tweets}></section>
    </div>
  );
}
