import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import './movie-view.scss';

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const movie = movies.find((b) => b.id === movieId);

    useEffect(() => {
        if(user && user.FavoriteMovies)  {
            const isFavorite = user.FavoriteMovies.includes(movieId);
            setIsFavorite(isFavorite);
        }
    }, [movieId, user]);

    const addtoFavorite = () => {
        fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}/${movieId}`,
        {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            }
        })
        .then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(true);
        })
        .catch((e) => {
            console.log(e);
        });       
    };
    const removefromFavorite = () => {
        fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}/${movieId}`,
        {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            }
        })
        .then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(false);
        })
        .catch((e) => {
        console.log(e);
        });       
    };
    return (
        <div>
            <div>
                <img className="w-100" src={movie.imagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
                <span> - </span>
                <span>{movie.director.bio}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <div>
                <span>Description: <br /></span>
                <span>{movie.description}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
            <div>
                {isFavorite ? (
                    <Button onClick={removefromFavorite}>Remove from favorite</Button>
                ) : (
                    <Button onClick={addtoFavorite}>Add to favorite</Button>   
                )}
            
            </div>
        </div>
    );
};
