import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Scraper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button variant="contained" color="primary">
        Hola mundo
      </Button>
    </div>
  );
}
