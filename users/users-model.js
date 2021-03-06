const db = require('../dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
};

function find() {
	return db('users').select(
		'id',
		'first_name',
		'last_name',
		'username',
		'password',
		'phone'
	);
}

function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
	const [id] = await db('users').insert(user);
	return findById(id);
}

function findById(id) {
	return db('users')
		.where({
			id,
		})
		.first();
}

function update(id, changes) {
	return db('users').where({ id }).update(changes);
}

function remove(id) {
	return db('users').where(id).del();
}
