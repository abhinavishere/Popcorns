import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_APIKEY;
function useMovies<T>({
  operation = "SearchByQuery",
  query,
}: {
  operation?: string;
  query: string | undefined;
}) {
  const [value, setValue] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    async function getMovies() {
      setIsLoading(true);
      try {
        let res;
        let data;
        if (operation === "SearchByQuery") {
          res = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
          );
          data = await res?.json();
          setValue(data.Search);
        } else if (operation === "SearchById") {
          res = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&i=${query}`
          );
          data = await res?.json();
          setValue(data);
        } else if (operation === "SearchByTitle") {
          res = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&t=${query}`
          );
          data = await res?.json();
          setValue(data);
        }

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    const dataTimeout = setTimeout(() => {
      if (!query) return;
      getMovies();
    }, 500);

    return () => {
      clearTimeout(dataTimeout);
      setValue(undefined);
    };
  }, [query, operation]);

  return { value, isLoading };
}

export default useMovies;
