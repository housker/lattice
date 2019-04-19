require('dotenv').config();
process.env.ENV = 'test';

const redis = require('redis');
const client = redis.createClient({
    port      : process.env.R_PORT,
    host      : process.env.R_HOST,
    password  : process.env.R_PASSWORD,
});

require('mocha-sinon');
const sinon  = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index.js');
const should = chai.should();
chai.use(chaiHttp);

describe('GET requests', () => {
    afterEach((done) => {
        client.flushdb( function (err, succeeded) {
            if(succeeded) {
                done();
            } else {
                console.error(err);
            }
        });        
    });

    describe('GET /genres', () => {
        it('it should return an array of length 19', (done) => {
            chai.request(server)
            .get('/genres')
            .end((err, res) => {
                    res.should.have.status(200);
                    JSON.parse(res.text).should.be.a('array');
                    JSON.parse(res.text).length.should.be.eql(19);
                    JSON.parse(res.text)[0].should.have.property('id');
                    JSON.parse(res.text)[0].should.have.property('name');
                done();
            });
        });
        it('it should cache on the first call', (done) => {
            let spy = sinon.spy(console, 'log');
            chai.request(server)
            .get('/genres')
            .end((err, res) => {
                res.should.have.status(200);
                spy.calledOnce.should.be.false;
                spy.calledWith('GRABBING FROM CACHE').should.be.false;
            spy.restore();
            done();
            });
        });
        it('it should take value from cache on subsequent calls', (done) => {
            let spy = sinon.spy(console, 'log');
            chai.request(server)
            .get('/genres')
            .end((err, res) => {
                res.should.have.status(200);
                chai.request(server)
                .get('/genres')
                .end((err, res) => {
                    res.should.have.status(200);
                    spy.calledOnce.should.be.be.true;
                    spy.calledWith('GRABBING FROM CACHE').should.be.true;
                spy.restore();
                done();
                });
            });
        });
    });

    describe('GET /popular', () => {
        it('it should return an array of objects', (done) => {
            chai.request(server)
            .get('/popular')
            .end((err, res) => {
                    res.should.have.status(200);
                    JSON.parse(res.text).should.be.a('array');
                    JSON.parse(res.text)[0].should.be.a('object');
                    JSON.parse(res.text)[0].should.have.property('id');
                    JSON.parse(res.text)[0].should.have.property('title');
                    JSON.parse(res.text)[0].should.have.property('poster_path');
                    JSON.parse(res.text)[0].should.have.property('genre_ids');
                done();
            });
        });
        it('it should cache on the first call', (done) => {
            let spy = sinon.spy(console, 'log');
            chai.request(server)
            .get('/popular')
            .end((err, res) => {
                res.should.have.status(200);
                spy.calledOnce.should.be.false;
                spy.calledWith('GRABBING FROM CACHE').should.be.false;
            spy.restore();
            done();
            });
        });
        it('it should take value from cache on subsequent calls', (done) => {
            let spy = sinon.spy(console, 'log');
            chai.request(server)
            .get('/popular')
            .end((err, res) => {
                res.should.have.status(200);
                chai.request(server)
                .get('/popular')
                .end((err, res) => {
                    res.should.have.status(200);
                    spy.calledOnce.should.be.be.true;
                    spy.calledWith('GRABBING FROM CACHE').should.be.true;
                spy.restore();
                done();
                });
            });
        });
    });

    describe('GET /query/:q', () => {
        it('it should return an array of objects', (done) => {
            chai.request(server)
            .get('/query/test')
            .end((err, res) => {
                    res.should.have.status(200);
                    JSON.parse(res.text).should.be.a('array');
                    JSON.parse(res.text)[0].should.be.a('object');
                    JSON.parse(res.text)[0].should.have.property('id');
                    JSON.parse(res.text)[0].should.have.property('title');
                    JSON.parse(res.text)[0].should.have.property('poster_path');
                    JSON.parse(res.text)[0].should.have.property('genre_ids');
                done();
            });
        });
    });

    describe('GET /details', () => {
        it('it should return an object', (done) => {
            chai.request(server)
            .get('/details/299536')
            .end((err, res) => {
                    res.should.have.status(200);
                    JSON.parse(res.text).should.be.a('object');
                    JSON.parse(res.text).should.have.property('belongs_to_collection');
                    JSON.parse(res.text).belongs_to_collection.should.have.property('parts');
                    JSON.parse(res.text).should.have.property('homepage');
                    JSON.parse(res.text).should.have.property('poster_path');
                    JSON.parse(res.text).should.have.property('title');
                    JSON.parse(res.text).should.have.property('release_date');
                    JSON.parse(res.text).should.have.property('tagline');
                    JSON.parse(res.text).should.have.property('overview');
                    JSON.parse(res.text).should.have.property('cast');
                    JSON.parse(res.text).cast.cast.should.be.a('array');
                    JSON.parse(res.text).cast.cast[0].should.have.property('character');
                    JSON.parse(res.text).cast.cast[0].should.have.property('name');
                done();
            });
        });
        it('it should cache on the first call', (done) => {
            let spy = sinon.spy(console, 'log');
            chai.request(server)
            .get('/details/299536')
            .end((err, res) => {
                res.should.have.status(200);
                spy.calledOnce.should.be.false;
                spy.calledWith('GRABBING FROM CACHE').should.be.false;
            spy.restore();
            done();
            });
        });
        it('it should take value from cache on subsequent calls', (done) => {
            let spy = sinon.spy(console, 'log');
            chai.request(server)
            .get('/details/299536')
            .end((err, res) => {
                res.should.have.status(200);
                chai.request(server)
                .get('/details/299536')
                .end((err, res) => {
                    res.should.have.status(200);
                    spy.calledOnce.should.be.be.true;
                    spy.calledWith('GRABBING FROM CACHE').should.be.true;
                spy.restore();
                done();
                });
            });
        });
    });
});
