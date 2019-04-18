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

app.use(express.static(`${__dirname}/client/dist`));

app.listen(PORT, () => console.log(`listening on ${PORT}`))