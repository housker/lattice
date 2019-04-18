import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Grid, Button, Segment, Input, Menu, Card, Form } from 'semantic-ui-react';
import style from './styles.css';
import Movie from './Movie.jsx';

class Thumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id='thumbnail'>
                <Link to={`/movie/${this.props.id}`}>
                { this.props.poster && <img src={`https://image.tmdb.org/t/p/w500/${this.props.poster}`} width='100%'></img> }
                <div id='caption'>{ this.props.title }</div>
                </Link>
            </div>
        );
    }
}

export default Thumbnail;
