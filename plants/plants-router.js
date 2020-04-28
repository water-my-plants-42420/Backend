const router = require('express').Router();
const Plants = require('./plants-model.js');

router.get('/', (req, res) => {
	Plants.find()
		.then((plants) => {
			res.status(200).json(plants);
		})
		.catch(() => {
			res.status(500).json({ message: 'Failed to get plants.' });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Plants.findById(id)
		.then((plant) => {
			res.status(200).json(plant);
			res.status(404).json({ message: `Could not find plant with ID: ${id}.` });
		})
		.catch(() => {
			res.status(500).json({ message: 'Failed to get plant.' });
		});
});
