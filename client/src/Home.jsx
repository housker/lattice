import React from 'react';
// import { Grid, Button, Segment, Input, Menu, Card, Form } from 'semantic-ui-react';
import style from './styles.css';
import Thumbnail from './Thumbnail.jsx';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            popular: []
        };
    }

    componentDidMount() {
        fetch('/popular')
        .then(res => res.json())
        .then(jres => this.setState({ popular: jres }))
        .catch(err => console.err(err));
    }

    render(id) {
        return (
            <div>
                <div id="top">
                    <div id="search">
                        <input type="search" placeholder="search"></input>
                    </div>
                </div>
      
                <div id="thumbnails">
                    { this.state.popular.length > 0 ? 
                      this.state.popular.map((movie, i) => 
                      <Thumbnail key={i} id={movie.id} poster={movie.poster_path} title={movie.title}/> ) : 
                      <div id="loading">Loading</div> 
                    }
                </div>
            </div>
        );
    }
}

export default Home;
