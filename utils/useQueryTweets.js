import { useState, useEffect } from "react";
import axios from "axios";
const useQueryTweets = (keyword, pageNumber, setPageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setTweets([]);
    setPageNumber(1);
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    const API = `https://puentech.herokuapp.com/api/v1/tweets/${keyword}`;
    axios({
      method: "GET",
      url: API,
      params: { limit: 5, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setTweets((prevTweets) => [
          ...new Set([...prevTweets, ...res.data.results]),
        ]);
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });
    return () => cancel();
  }, [keyword, pageNumber]);

  return {
    loading,
    error,
    tweets,
    hasMore,
  };
};

export default useQueryTweets;
