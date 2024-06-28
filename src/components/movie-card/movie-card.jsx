import PropTypes from "prop-types";

export const MovieCard = ({ movie, onClick }) => {
    return (
        <div
            onClick={() => {
                onClick(movie);
            }}
        >
            {movie.title}
        </div>
    )
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }),
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth_year: PropTypes.string
        })
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
 