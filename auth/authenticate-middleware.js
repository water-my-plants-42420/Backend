const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	const secret = secrets.jwtSecret;
	token
		? jwt.verify(token, secret, (error, decodedToken) => {
				error
					? res.status(401).json({
							you: 'you shall not pass',
					  })
					: (req.decodedToken = decodedToken);
				next();
		  })
		: res.status(400).json({
				message: 'please provide credentials',
		  });
};
