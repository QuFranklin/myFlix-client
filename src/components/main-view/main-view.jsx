import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
        { 
            id: 1, 
            title: "Rush Hour",
            image: "https://m.media-amazon.com/images/I/61kGlPSpkKL._AC_UF894,1000_QL80_.jpg",
            director: "Brett Ratner",
            genre: "Action"
 
        },
        { 
            id: 2, 
            title: "Inception",
            image: "https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg",
            director: "Christopher Nolan",
            genre: "Sci-Fi"
  
        },
        { 
            id: 3, 
            title: "Spirited Away",
            image: "https://m.media-amazon.com/images/I/710ievVCTTL._AC_UF894,1000_QL80_.jpg",
            director: "Hayao Miyazaki",
            genre: "Fantasy"
  
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);


    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
 

    if (movies.length === 0 ) {
        return <div>The list is empty</div>;
    }
    
    return (
      <div>
        {movies.map((movie) => (
            <MovieCard 
                key={movie.id} 
                movie={movie}
                onClick={() => {
                    setSelectedMovie(movie);
                }} 
            />
        ))}
      </div>
    );
  };