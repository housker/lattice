# Lattice Take Home Exercise

Web app for finding information about favorite movies using the The Movie Database API.

## Getting Started

Create a .env file in the root directory and add the following keys:
PORT=####
KEY=####
R_PORT=####
R_HOST=####
R_password=####

Run for development:
From the command line in the root directory, run npm install. In a seperate window, execute redis-server to start the cache server. Next run npm run dev-start. In your browser, navigate to the port displayed in the console, i.e. localhost:####


Please include a README.md with step-by-step instructions for running the app. Be careful to ensure there are not local dependencies that have been overlooked in the readme.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

If you do not have mocha installed, run npm install mocha -g.
Stop the app's server if it is currently running, and start the redis server.
Run npm test

### And coding style tests

To run style linter execute
./node_modules/.bin/eslint yourfile.js

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Node.js](https://nodejs.org/en/) - The back end used
* [Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction) - The data source used
* [React](https://reactjs.org/) - The front end used

## Authors

* **Adelle Housker** - [housker](https://github.com/housker)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
