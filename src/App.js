import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=star+wars&apikey=4a3b711b";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(MOVIE_API_URL);
      const data = await response.json();
      setMovies(data.Search);
      setIsLoading(false);
    };
    getMovies();
  }, []);

  const search = async searchValue => {
    setIsLoading(true);
    setErrorMessage(null);
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`
    );
    const data = await response.json();
    data.Response === "True"
      ? setMovies(data.Search)
      : setErrorMessage(data.Error);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Header text="OMDB SEARCH" />
      <Search search={search} />
      <div className="movies">
        {isLoading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
