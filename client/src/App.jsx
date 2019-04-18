import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import { Grid, Button, Segment, Input, Menu, Card, Form } from 'semantic-ui-react';
import style from './styles.css';
import Movie from './Movie.jsx';
import Home from './Home.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/movie/:id" component={ Movie } />
                </Switch>
            </Router>
        );
    }
}

export default App;
