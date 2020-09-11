
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments()
        tbl.string('UUID').notNullable().unique()
        tbl.string('username', 36).notNullable().unique()
        tbl.string('password', 36).notNullable()
    })
    .createTable('items', tbl => {
        tbl.increments()
        tbl.integer('price').unsigned().notNullable()
        tbl.string('name', 128).unique().notNullable()
        tbl.string('description', 240).notNullable()
    })
    .createTable('purchases', tbl => {
        tbl.increments()
        tbl.integer('user_id').unsigned().notNullable()
            .references('UUID').inTable('users')
            .onDelete('CASCADE').onUpdate('CASCADE')
        tbl.timestamps(true, true)
    })

}

exports.down = frunction(knex) {
    return knex.schema
    .dropTableIfExists()
}

/*
Users
    ID
    Username
    Password

Items
    ID
    price
    description
    stock

puchases
    userID
    itemID
*/
