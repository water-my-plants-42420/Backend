const router = require('express').Router();
const Plants = require('./plants-model.js');

router.get('/', (req, res) => {
	Plants.find()
		.then((plants) => {
			res.status(200).json(plants);
		})
		.catch(() => {
			res.status(500).json({
				message: 'Failed to get plants.',
			});
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Plants.findById(id)
		.then((plant) => {
			res.status(200).json(plant);
			res.status(404).json({
				message: `Could not find plant with ID: ${id}.`,
			});
		})
		.catch(() => {
			res.status(500).json({
				message: 'Failed to get plant.',
			});
		});
});

router.post('/', (req, res) => {
	const { id } = req.params;
	const newPlant = req.body;
	Plants.add(newPlant, id)
		.then((plant) => {
			res.status(201).json({ created: plant });
		})
		.catch(() => {
			res.status(500).json({ errorMessage: 'Failed to post new plant', err });
		});
});

router.put('/:id', (req, res) => {
	const { user_id, id } = req.params;
	const changes = req.body;

	Plants.findById(id)
		.then((plant) => {
			if (plant) {
				Plants.update(id, changes)
					.then((updated) => {
						res.status(200).json({
							message: 'successfully updated',
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							errorMessage: error.message,
						});
					});
			} else {
				res.status(404).json({
					errorMessage: 'plant not found',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				errorMessage: error.message,
			});
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Plants.remove(id)
		.then((deleted) => {
			res.status(200).json({ removed: deleted });
		})
		.catch(() => {
			res
				.status(500)
				.json({ errorMessage: `cannot remove plant by ID: ${id}` });
		});
});

module.exports = router;
