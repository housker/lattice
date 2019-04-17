const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static(`${__dirname}/client/dist`));

app.listen(PORT, () => console.log(`listening on ${PORT}`))