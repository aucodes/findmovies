import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";
// using functional type as class-based is no longer used. 
const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); // use state for the search term
  const [movies, setMovies] = useState([]); // use state for movies is empty array rn

  useEffect(() => {
    searchMovies("Batman");
  }, []); //to load the movies before hand for the first time

  //api call to search movies
  const searchMovies = async (title) => { 
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search); // used to set the data set. 
  };

  return (
    <div className="app">
      <h1>Movie Time</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // event listener for search
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} // calling the api and searchterm is what the user typed.
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;