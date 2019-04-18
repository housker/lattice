import React from 'react';
// import { Grid, Button, Segment, Input, Menu, Card, Form } from 'semantic-ui-react';
import style from './styles.css';
import Tooltip from './Tooltip.jsx';



class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            // movie: {}
        };
    }

    componentDidMount() {
        fetch(`/details/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(jres => this.setState({ movie: jres }))
        .catch(err => console.error(err));
    }

    render(id) {
        const movie = this.state.movie
        return (
            <div className="wrapper">
            { movie &&


<div className="container">


<div className="left">
<a href={movie.homepage}><img id="poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img></a>
        </div>
        <div className="right">
        <a href={movie.homepage}><div className="title">{movie.title} <span id="year">({movie.release_date.split('-')[0]})</span></div></a>
        
        <div id="tagline">{movie.tagline}</div>
        
        <div id="synopsis">{movie.overview}</div>
        <ul>
            {movie.cast.cast.map(actor => <li><Tooltip  message={actor.character}>{actor.name}</Tooltip></li>)}
        </ul>
        {/* <div>{movie.cast}</div> */}
        <div></div>
    </div>

</div>
    

      
            
            }

            </div>
        );
    }
}

export default Movie;
