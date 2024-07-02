import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";



export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://moviesdb-6abb3284c2fb.herokuapp.com/movies", {
            headers: { Authorization: 'Bearer ${token}' }
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
            })
    }, [token]);
    
    if (!user) {
        return (
            <LoginView 
                onLoggedIn={(user) => {
                setUser(user)
        }} 
        />
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
            <button 
            onClick={() => {
                setUser(null);
            }}
            >Logout</button>
        <div>The list is empty</div>
        </>
        );
    }
    
    return (
      <div>
        {movies.map((movie) => (
            <MovieCard 
                key={movie.id} 
                movie={movie}
                onClick={(movie) => {
                    setSelectedMovie(movie);
                }} 
            />
        ))}
        <button onClick={() => { setUser(null); }}>Logout</button>
      </div>
    );
};