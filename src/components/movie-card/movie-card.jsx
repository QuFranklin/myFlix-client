import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";


export const MovieCard = ({ movie, onClick }) => {
    return (
        <Card className="h-100">
        <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Button onClick={() => onClick(movie)} variant="primary">
                    View Movie
                </Button>
            </Card.Body>
        </Card>
    );
  };
 