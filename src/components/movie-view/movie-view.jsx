import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";


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
        
        <Card className="h-100 w-100">
        <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
               <Card.Header className="text-center fs-1">{movie.title}</Card.Header>
               <br></br>
                    <Card.Text><strong>Director</strong> - {movie.director.name}</Card.Text>
                    <Card.Text><strong>Genre</strong> - {movie.genre.name}</Card.Text>
                    <Card.Text><strong>Description</strong> - {movie.description}</Card.Text>
            <Link to={`/`}>
                <Button variant="outline-primary">Back to movies</Button>
            </Link>  
            <div className="mt-2"> 
                {isFavorite ? (
                    <Button variant="danger" onClick={removefromFavorite}>Remove from favorite</Button>
                    
                ) : (
                    <Button variant="primary" onClick={addtoFavorite}>Add to favorite</Button>  
                     
                )}
            </div>
            </Card.Body>
        </Card>
        
    )
}