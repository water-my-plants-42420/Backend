const request = require('supertest');

const server = require('./server');
const db = require('../dbConfig.js');
var loggedInToken = '';
describe('server', function () {
	describe('POST /register', function () {

		it('should return 500 on fail', function () {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'testuser2' })
				.then((res) => {
					expect(res.status).toBe(500);
				});
		});
	});

	describe('POST /login', function () {
		it('should return message on successful login', function () {
			return request(server)
				.post('/api/auth/login')
				.send({ username: 'testuser', password: 'abc' })
				.then((res) => {
					expect(res.body.message).toBe('You are logged in!');
					loggedInToken = res.body.token;
				});
		});
		it('should return 500 on fail', function () {
			return request(server)
				.post('/api/auth/login')
				.send({ username: 'testuser' })
				.then((res) => {
					expect(res.status).toBe(500);
				});
		});
	});

	describe('GET /plants/', function () {
		it('should return 200 on success', function () {
			return request(server)
			.get('/api/plants/')
			.set('Authorization', loggedInToken)
			.then(res => {
				expect(res.status).toBe(200);
			})
		})
	})
	describe('GET /plants/user/:id', function () {
		it('should return 200 on success', function () {
			return request(server)
			.get('/api/plants/user/1')
			.set('Authorization', loggedInToken)
			.then(res => {
				expect(res.status).toBe(200);
			})
		})
	})

	describe('GET /plants/:id', function () {
		it('should return 200 on success', function () {
			return request(server)
			.get('/api/plants/4')
			.set('Authorization', loggedInToken)
			.then(res => {
				expect(res.status).toBe(200);
			})
		})
	})
	describe('POST /plants/',function () {
		it('should return 201 on success', function () {
			return request(server)
			.post('/api/plants/')
			.set('Authorization', loggedInToken)
			.send({ name: 'testplantname', species: 'testplantspecies', water_freq: 'testplantwater', user_id: 1})
			.then(res => {
				expect(res.status).toBe(201);
			})
		})
	})
	describe('PUT /plants/:id', function () {
		it('should return 200 on success', function () {
			return request(server)
			.put('/api/plants/4')
			.set('Authorization', loggedInToken)
			.send({name: 'testchange1', species: 'testchange1', water_freq: 'testchange1', user_id: 1})
			.then(res => {
				expect(res.status).toBe(200)
			})
		})
	})
	describe('DELETE /plants/:id', function () {
		it('should return 200 on success', function () {
			return request(server)
			.delete('/api/plants/1')
			.set('Authorization', loggedInToken)
			.then(res => {
				expect(res.status).toBe(200)
			})
		})
	})
	describe('GET /users/', function () {
		it('should return 200 on success', function() {
			return request(server)
			.get('/api/users/')
			.set('Authorization', loggedInToken)
			.then(res => {
				expect(res.status).toBe(200)
			})
		})
	})
	describe('Get /users/:id', function () {
		it('should return 200 on success', function () {
			return request(server)
			.get('/api/users/1')
			.set('Authorization', loggedInToken)
			.then(res => {
				expect(res.status).toBe(200)
			})
		})
	})
	describe('PUT /users/:id', function () {
		it('should return 200 on success', function () {
			return request(server)
			.put('/api/users/1')
			.set('Authorization', loggedInToken)
			.send({username: 'testuserchange', password: 'testpasschange', phone: 'testphonechange'})
			.then(res => {
				expect(res.status).toBe(200)
			})
		})
	})
	describe('DELETE /users/:id', function () {
		it('should return 200 on success', function () {
			return request(server)
			.delete('/api/users/1')
			.set('Authorization', loggedInToken)
			.then(res => {
				expect(res.status).toBe(200)
			})
		})
	})
});
