const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js');

describe('items routes', () => {
    authInfo = {
        username: "itemstest",
        password: "itempass"    }

    beforeAll( async () => {
        await db('items').truncate()

        await db('users').truncate()

        await request(server).post('/api/auth/register')
            .send(authInfo).then(res => {
                authInfo.id = res.body.newUser.UUID
                authInfo.token = res.body.token
            })
    })

    describe('POST to items', () => {
        it('should return added item from /', async () => {
            const testItem = {
                "price": 99.99,
                "name": "something ",
                "description": "Only the BEST thing",
                "size": 1,
                "color": 1,
                "cat_id": 1
            }
            
            await request(server).post('/api/items').set('authorization', authInfo.token)
            .set('Accept', 'application/json')
            .send(testItem).then(res => {

                console.log(res.body)

                expect(res.status).toBe(201)
            })
        })
    })

    xdescribe('GET to items', () => {
        it('should return all item from /', async () => {
            await request(server).get('/api/items').then(res => {
                expect(res.status).toBe(200)
                expect(res.body.categories).toBeTruthy()
                expect(res.body.items).toBeTruthy()
            })
        })

        it('should return one item from /:id', async () => {
            await request(server).get('/api/items/:id').then(res => {
                expect(res.status).toBe(200)
                expect(res.body.item).toBeTruthy()
            })
        })
    })

    xdescribe('PUT to items', () => {
        it('should return the updated item', async() => {
            const testUpdate = {

            }

            await request(server).put('/api/items/:id')
            .send(testUpdate).then(res => {
                expect(res.status).toBe(201)
            })
        })
    })

    xdescribe('DELETE to items', () => {
        it('should return a number 1 from /:id', async () => {
            await request(server).delete('/api/items/:id')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})

// need test items