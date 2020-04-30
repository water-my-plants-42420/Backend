const request = require('supertest');
const server = require('./server');

describe('server', function () {
	describe('POST /register', function () {
		it('should return 500 on success', function () {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'testuser', password: 'abc', phone: '1234567' })
				.then((res) => {
					expect(res.status).toBe(500);
				});
		});

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
});
