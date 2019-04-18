const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static(`${__dirname}/client/dist`));

app.get('movie/:id', (req, res, next) => {
    res.end(`${__dirname}/client/dist`)
    // axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.KEY}&language=en-US&page=1`)
    // .then(r => res.end(JSON.stringify(r.data.results)))
    // // .then(jres => console.log(jres))
    // .catch(err => console.error(err));
})

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

app.get('/details/:id', (req, res, next) => {
    const overview = axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.KEY}&language=en-US`)
    // .then(r => res.end(JSON.stringify(r.data)))
    // .then(r => data = r.data)
    // .then(r => console.log(r.data))
    .catch(err => console.error(err));

    const cast = axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.KEY}&language=en-US`)
    // .then(r => res.end(JSON.stringify(r.data)))
    // .then(r => res.end(JSON.stringify(r.data)))
    // .then(r => console.log(r.data))
    .catch(err => console.error(err));

    Promise.all([overview, cast])
    .then(values => {
        let data = values[0].data;
        data.cast = values[1].data;
        res.end(JSON.stringify(data));
    })
})


https://api.themoviedb.org/3/search/movie?query=say+a+word&api_key=8b3ad2b1e575bf3306e39dac7cc19ec5&language=en-US&page=1&include_adult=false

// app.all('*', express.static(`${__dirname}/client/dist`));
app.get('*', (req, res) => {
    // res.set('Content-Type', 'text/html');
    res.redirect('/')
    // express.static(`${__dirname}/client/dist`)
    // res.sendFile(`${__dirname}/client/dist/index.html`)
    // res.render(express.static(`${__dirname}/client/dist`))
})
// res.sendFile(`${__dirname}/client/dist/index.html`, { headers: { 'Content-Type': 'text/html' } }));

app.listen(PORT, () => console.log(`listening on ${PORT}`))