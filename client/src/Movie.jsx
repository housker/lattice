import React from 'react';
import { Link } from "react-router-dom";
import style from './styles.css';
import Tooltip from './Tooltip.jsx';



class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
        };
        this.fetchDetails = this.fetchDetails.bind(this);
    }

    componentDidMount() {
        this.fetchDetails();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchDetails();
        }
    }

    fetchDetails() {
        fetch(`/details/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(jres => this.setState({ movie: jres }))
        .catch(err => console.error(err));
    }

    render(id) {
        const movie = this.state.movie
        console.log(movie)
        return (
            <div className="wrapper">
                { movie &&
                <div>
                    { movie.belongs_to_collection && <div className="related"><span>Related:</span>{ movie.belongs_to_collection.parts.map((part, i) => <span key={i}><Link to={`/movie/${part.id}`}>{ part.title }</Link></span>)}</div> }
                    <div className="container">
                        <div className="left">
                            <a href={movie.homepage}><img id="poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img></a>
                        </div>
                        <div className="right">
                            <a href={movie.homepage}>
                                <div className="title">{movie.title} 
                                    <span id="year">({movie.release_date.split('-')[0]})</span>
                                </div>
                            </a>
                            <div id="tagline">{movie.tagline}</div>
                            <div id="synopsis">{movie.overview}</div>
                            <ul>
                                {movie.cast.cast.map((actor, i) => <li key={i}><Tooltip  message={actor.character}>{actor.name}</Tooltip></li>)}
                            </ul>
                        </div>
                    </div>
                </div> }
            </div>
        );
    }
}

export default Movie;
