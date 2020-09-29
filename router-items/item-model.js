const db = require('../database/dbConfig.js')

module.exports = {
    getAll,
    getById,
    update,
    remove
}

async function getAll() {
    return db('items as i')
    .join('subCategories as sub', 'sub.id', 'i.cat_id')
    .select('i.id', 'i.price', 'i.size', 'i.color', 'i.cat_id')
}

async function getById(id) {
    return db('items as i')
    .join('item_sizes as s', 's.size', 'i.size')
    .join('item_colors as c', 'c.color', 'i.color')
    .where(id)
}

async function update(id, updates) {
    return db('items')
    .where(id)
    .insert(updates)
}

async function remove(id) {
    return db('items')
    .where(id)
    .del()
    .then(() => {
        return getAll()
    })
}