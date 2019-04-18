const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static(`${__dirname}/client/dist`));

app.get('movie/:id', (req, res, next) => {
    res.end(`${__dirname}/client/dist`);
})

app.get('/popular', (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.KEY}&language=en-US&page=1`)
    .then(r => res.end(JSON.stringify(r.data.results)))
    .catch(err => console.error(err));
})

app.get('/query/:q', (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${req.params.q}&api_key=${process.env.KEY}&language=en-US&page=1&include_adult=false`)
    .then(r => res.end(JSON.stringify(r.data.results)))
    .catch(err => console.error(err));
})

app.get('/details/:id', (req, res, next) => {
    var data = { data: {}};
    const overview = new Promise((resolve, reject) => {
        axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.KEY}&language=en-US`)
        // .then(r => res.end(JSON.stringify(r.data)))
        .then(r => {
            data.data = r.data;
            if (r.data.belongs_to_collection) {
                axios.get(`https://api.themoviedb.org/3/collection/${r.data.belongs_to_collection.id}?api_key=${process.env.KEY}&language=en-US`)
                .then(r => {
                    data.data.belongs_to_collection.parts = r.data.parts;
                    resolve(data);
                })
                .catch(err => reject(err));
            } else {
                resolve(data);
            }
        })
        .catch(err => reject(err));
    }) 


    const cast = axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.KEY}&language=en-US`)
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