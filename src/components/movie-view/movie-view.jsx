import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
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
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <button 
                onClick={onBackClick} 
                className="back-button"
                style={{ cursor: "pointer"}}>
                Back
            </button>
        </div>
    );
 };
 