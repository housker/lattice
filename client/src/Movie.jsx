import React from 'react';
// import { Grid, Button, Segment, Input, Menu, Card, Form } from 'semantic-ui-react';
import style from './styles.css';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {        };
    }

    componentDidMount() {
    }

    render(id) {
        return (
            <div>
                Movie
                { id }
            </div>
        );
    }
}

export default Movie;
