const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/', (req, res) => {
	console.log('token', req.decodedToken);
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => res.send(err));
});

router.get('/:userId', (req, res) => {
	const id = req.params.Id;
	Users.findById(id).then((user) => {
		res.status(200).json(user);
	});
});

router.delete('/:id', (req, res) => {
	Users.remove(req.params.id)
	.then(res.status(200).json({message: 'user deleted'}))
	.catch(err => {
		console.log(err);
		res.status(500).json({ message: err.message})
	})
})

router.put("/:id", (req, res) => {
	Users.update(req.params.id, req.body)
	.then(user => {
		res.status(200).json(user);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({message: err.message})
	})
})

module.exports = router;
