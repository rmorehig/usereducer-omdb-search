import React, { useReducer, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = `${process.env.REACT_APP_MOVIE_API_URL}star+wars`;

const initialState = {
  loading: true,
  movies: [],
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(MOVIE_API_URL);
      const data = await response.json();
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: data.Search
      });
    };
    getMovies();
  }, []);

  const search = async searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_API_URL}${searchValue}`
    );
    const data = await response.json();
    data.Response === "True"
      ? dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: data.Search
        })
      : dispatch({
          type: "SEARCH_MOVIES_ERROR",
          payload: data.Error
        });
  };
  const { movies, error, loading } = state;
  return (
    <div className="App">
      <Header text="OMDB SEARCH" />
      <Search search={search} />
      <div className="movies">
        {loading && !error ? (
          <span>Loading...</span>
        ) : error ? (
          <div className="error">{error}</div>
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
