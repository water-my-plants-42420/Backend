exports.up = function (knex) {
	return knex.schema
		.createTable('users', (users) => {
			users.increments();
			profiles.string('first_name');
			profiles.string('last_name');
			users.string('username', 128).notNullable().unique();
			users.string('password', 128).notNullable();
			users.integer('phone', 15).notNullable();
		})

		.createTable('plants', (plants) => {
			plants.increments();
			plants.string('name', 128).notNullable();
			plants.string('species', 128).notNullable();
			plants.string('water_freq', 128).notNullable();
			plants
				.integer('user_id')
				.notNullable()
				.unsigned()
				.references('id')
				.inTable('users');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users').dropTableIfExists('plants');
};
