# Lattice Take Home Exercise

[Web app](https://lattice-take-home.herokuapp.com)for finding information about favorite movies using the The Movie Database API.

## Getting Started

### Prerequisites

- [Node](https://nodejs.org/en/) >= 8.11.2
- [Redis](https://redis.io/) >= 5.0.3
- [Mocha](https://mochajs.org/) >= 6.1.4

Sign up or login to [The Movie Database](https://www.themoviedb.org/account/) to access API key.

### Installing

1. Create a .env file in the root directory and add API key along with the following environment variables:
```
PORT=####
KEY=####
R_PORT=####
R_HOST=####
R_password=####
```

2. From the command line in the root directory:
```
npm install
```
3. In a seperate window start the caching server:
```
redis-server
```
4. Finally, build the React bundle and start the server. These will be set to watch, i.e., hot loading of any changes. 
```
NODE_ENV=dev npm run dev-start
```
5. After the build is complete, in your browser, navigate to the port displayed in the console, i.e., localhost:####


**Note**: If you want to run production build locally, comment out `if(process.env.NODE_ENV === 'dev')` in index.js, and run:
```
npm run build
npm start
```

## Running the tests

If you do not have mocha installed: 
```
npm install mocha -g
```
Stop the app's server if it is currently running, and start the redis server (see [Getting Started](#getting-started)). Then run:
```
npm test
```

### And coding style tests

To run style linter execute:
```
./node_modules/.bin/eslint yourfile.js
```

## Deployment

Production build [deployed](https://lattice-take-home.herokuapp.com) to heroku.

## Built With

* [Node.js](https://nodejs.org/en/) - The back end used
* [Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction) - The data source used
* [React](https://reactjs.org/) - The front end used

## Authors

* **Adelle Housker** - [housker](https://github.com/housker)
