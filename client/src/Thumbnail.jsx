import React from 'react';
import { Link } from "react-router-dom";

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
