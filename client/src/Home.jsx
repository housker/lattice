import React from 'react';
// import { debounce } from "debounce";
// import { Grid, Button, Segment, Input, Menu, Card, Form } from 'semantic-ui-react';
import style from './styles.css';
import Thumbnail from './Thumbnail.jsx';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popular: [],   
            display: [],
            search: ''
        };
        this.search = this.search.bind(this);
        // this.debounce = this.debounce.bind(this);
    }

    componentDidMount() {
        fetch('/popular')
        .then(res => res.json())
        .then(jres => this.setState({ popular: jres, display: jres }))
        .catch(err => console.error(err));
    }

    search(e) {
        this.setState({ search: e.target.value })
        this.fetchQuery(encodeURIComponent(e.target.value));
    }

    fetchQuery(q) {
        if(q.length > 0) {
            fetch(`/query/${q}`)
            .then(res => res.json())
            .then(jres => this.setState({ display: jres }))
            .catch(err => console.error(err));
        } else {
            this.setState({ display: this.state.popular });
        }
    }

    render(id) {
        return (
            <div>
                <div id="top">
                    <div id="search">
                        <input type="search" placeholder="search" value={this.state.search} onChange={this.search}></input>
                    </div>
                </div>
      
                <div id="thumbnails">
                    { this.state.display.length > 0 ? 
                      this.state.display.map((movie, i) => 
                      <Thumbnail key={i} id={movie.id} poster={movie.poster_path} title={movie.title}/> ) : 
                      <div id="loading">Loading</div> 
                    }
                </div>
            </div>
        );
    }
}

export default Home;
