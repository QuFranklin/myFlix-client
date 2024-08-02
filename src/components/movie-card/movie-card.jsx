import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    
    return (
        <Card className="h-100">
            
        <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
                <div className="d-flex justify-content-center">
                    <Card.Title>{movie.title}</Card.Title>
                </div>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="outline-primary">More Info</Button>
                </Link>
            </Card.Body>
            
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
        director: PropTypes.object.isRequired
    }).isRequired
};