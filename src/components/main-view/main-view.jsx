import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    useEffect(() => {
        if (!token) return;
        
        fetch("https://moviesdb-6abb3284c2fb.herokuapp.com/movies", {
            headers: { Authorization: 'Bearer ${token}' },
        })
            .then((response) => response.json())
            .then((movies) => {
                const moviesApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        imagePath: movie.imagePath,
                        genre: movie.genre,
                        director: movie.director
                    };
                });
                setMovies(moviesApi);
            });
    }, [token]);
    
    if (!user) {
        return (
            <>Login
                <LoginView 
                    onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                    }} 
                />
                Sign Up
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
 

    if (movies.length === 0 ) {
        return (
            <>
                <div>The list is empty</div>
                <button 
                    onClick={() => {
                        setUser(null); 
                        setToken(null); 
                        localStorage.clear(); 
                    }}>Logout
                </button>  
            </>
        );
    }
    
    return (
      <div>
        {movies.map((movie) => (
            <MovieCard 
                key={movie.id} 
                movie={movie}
                onClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }} 
            />
        ))}
        <button onClick={() => { 
            setUser(null); 
            setToken(null); 
            localStorage.clear(); 
            }}>Logout
        </button>
      </div>
    );
};