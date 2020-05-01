const router = require('express').Router();
const Users = require('./users-model.js');
const Auth = require('../auth/authenticate-middleware.js');

router.get('/', (req, res) => {
	console.log('token', req.decodedToken);
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => res.send(err));
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Users.findById(id).then((user) => {
		res.status(200).json(user);
	});
});

router.put('/:id', Auth, (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	Users.findById(id)
		.then((user) => {
			if (user) {
				Users.update(id, changes).then((updateUser) => {
					res.status(200).json({ message: `successfully updated user ID: ${id}`, updateUser });
				});
			} else {
				res.status(404).json({ message: 'no user found' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: err.message });
		});
});

router.delete('/:id', Auth, (req, res) => {
	const { id } = req.params;
	Users.remove({ id })
		.then(res.status(200).json({ message: 'user deleted' }))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: err.message });
		});
});

module.exports = router;
