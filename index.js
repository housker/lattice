const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

let
  redis     = require('redis'),
  client    = redis.createClient({
    port      : process.env.R_PORT,
    host      : process.env.R_HOST,
    password  : process.env.R_PASSWORD,
  });

var checkCache = (req, res, next) => {
    client.get(req.params.id, (err,value) => {
        if(err || value === null) {
            next(); 
        } else {
            console.log('GRABBING FROM CACHE')
            res.end(value);
        }
    });
}

app.use(express.static(`${__dirname}/client/dist`));

app.get('/genres', (req, res, next) => {
    client.get('genres', (err,value) => {
        if(err || value === null || value === undefined) {
            axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.KEY}&language=en-US`)
            .then(r => {
                client.set('genres',JSON.stringify(r.data.genres), err => { if(err) console.error(err) });
                res.end(JSON.stringify(r.data.genres));
            })
            .catch(err => console.error(err));  
        } else {
            console.log('GRABBING FROM CACHE')
            res.end(value);
        }
    });
});

app.get('movie/:id', (req, res, next) => {
    res.end(`${__dirname}/client/dist`);
})

app.get('/popular', (req, res, next) => {
    client.get('popular', (err,value) => {
        if(err || value === null) {
            axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.KEY}&language=en-US&page=1`)
            .then(r => {
                client.set('popular',JSON.stringify(r.data.results), err => { if(err) console.error(err) });
                res.end(JSON.stringify(r.data.results));
            })
            .catch(err => console.error(err));  
        } else {
            console.log('GRABBING FROM CACHE')
            res.end(value);
        }
    });
});

app.get('/query/:q', (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${req.params.q}&api_key=${process.env.KEY}&language=en-US&page=1&include_adult=false`)
    .then(r => res.end(JSON.stringify(r.data.results)))
    .catch(err => console.error(err));
})

app.get('/details/:id', checkCache, (req, res, next) => {
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
    .catch(err => console.error(err));

    Promise.all([overview, cast])
    .then(values => {
        let data = values[0].data;
        data.cast = values[1].data;
        client.set(req.params.id,JSON.stringify(data), err => { if(err) console.error(err) });
        res.end(JSON.stringify(data));
    })
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))