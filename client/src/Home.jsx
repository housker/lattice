import React from 'react';
import style from './styles.css';
import Thumbnail from './Thumbnail.jsx';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            popular: [],
            allResults: [],   
            display: [],
            search: ''
        };
        this.search = this.search.bind(this);
        this.selectGenre = this.selectGenre.bind(this);
    }

    componentDidMount() {
        this.fetchGenres();
        this.fetchPopular();
    }

    search(e) {
        document.getElementById("gdropdown").selectedIndex = "0";
        this.setState({ search: e.target.value })
        this.fetchQuery(encodeURIComponent(e.target.value));
    }

    fetchGenres() {
        fetch('/genres')
        .then(res => res.json())
        .then(jres => this.setState({ genres: jres }))
        .catch(err => console.error(err));

    }

    fetchPopular() {
        fetch('/popular')
        .then(res => res.json())
        .then(jres => this.setState({ popular: jres, allResults: jres, display: jres }))
        .catch(err => console.error(err));
    }

    fetchQuery(q) {
        if(q.length > 0) {
            fetch(`/query/${q}`)
            .then(res => res.json())
            .then(jres => this.setState({ allResults: jres, display: jres }, () => {
                if(this.state.display.length < 1) {
                    document.getElementById('loading').innerText = 'No Results'
                }
            }))
            .catch(err => console.error(err));
        } else {
            this.setState({ display: this.state.popular, allResults: this.state.popular });
        }
    }

    selectGenre(e) {
        let i = e.target.options.selectedIndex
        let genreId = e.target.options[i].getAttribute('data-key');
        if(genreId === null) {
            this.setState({ display: this.state.allResults })
        } else {
            let filtered = this.state.allResults.filter(movie => movie.genre_ids.indexOf(parseInt(genreId)) > -1);
            this.setState({ display: filtered }, () => {
                if(this.state.display.length < 1) {
                    document.getElementById('loading').innerText = 'No Results'
                }
            });
        }
    }

    render(id) {
        return (
            <div>
                <div id="top">
                    <div id="search">
                        <input type="search" placeholder="search" value={this.state.search} onChange={this.search}></input>
                    </div>
                    <div className="genres">
                        <select id="gdropdown" onChange={this.selectGenre}>
                            <option>Genres</option>
                            { this.state.genres.map(genre => <option key={genre.id} data-key={genre.id}>{ genre.name }</option>) }
                        </select>
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
