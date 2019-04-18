const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.get('/popular', (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.KEY}&language=en-US&page=1`)
    .then(r => res.end(JSON.stringify(r.data.results)))
    // .then(jres => console.log(jres))
    .catch(err => console.error(err));
})

app.get('/query/:q', (req, res, next) => {
    // console.log(req.params.q)
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${req.params.q}&api_key=${process.env.KEY}&language=en-US&page=1&include_adult=false`)
    .then(r => res.end(JSON.stringify(r.data.results)))
    // .then(r => console.log(r.data))
    .catch(err => console.error(err));
})


https://api.themoviedb.org/3/search/movie?query=say+a+word&api_key=8b3ad2b1e575bf3306e39dac7cc19ec5&language=en-US&page=1&include_adult=false

app.use(express.static(`${__dirname}/client/dist`));

app.listen(PORT, () => console.log(`listening on ${PORT}`))