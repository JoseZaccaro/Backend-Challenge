const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app.js')
const api = supertest(app)

jest.setTimeout(15000)

describe('Routes functionality test', () => {

    it('Generate Stores for Test', async () => {
        const res = await api
            .post('/api/seeder')
            .auth('test@koibanx.com', 'test123')
            .expect(200)
        expect(res.body).toEqual("Seeder successfully poblate with 150 new stores")
    })

    it('Generate one Store and get the response', async () => {
        const res = await api
            .post('/api/stores')
            .auth('test@koibanx.com', 'test123')
            .send({
                "concepts": [
                    "Kindle",
                    "Electronics",
                    "CDs & Vinyl",
                    "Computers & Tablets",
                    "Video Games",
                    "Antiques"
                ],
                "name": "Lei Sithole",
                "cuit": "23-78682931-6",
                "currentBalance": 22495388,
                "active": true,
                "lastSale": "2022/01/31",
            })
            .expect(200)
        expect(res.body).toHaveProperty("concepts", "currentBalance", "cuit", "name", "active", "lastSale")
    })

    it('Generate a store in the wrong way', async () => {
        const res = await api
            .post('/api/stores')
            .auth('test@koibanx.com', 'test123')
            .send({
                "name": "Lei Sithole",
                "cuit": "23-78682931-6",
                "currentBalance": 22495388,
                "lastSale": "2022/01/31",
            })
            .expect(200)
        expect(res.body).toHaveProperty("errores")

    })

    it('Many Stores are returned as json', async () => {
        const res = await api
            .get('/api/stores')
            .auth('test@koibanx.com', 'test123')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body).toHaveProperty('data')
        expect(res.body.data.length).toBeGreaterThanOrEqual(2)
    })

    it('Delete all stores', async () => {
        const res = await api
            .delete('/api/seeder')
            .auth('test@koibanx.com', 'test123')
            .expect(200)

        expect(res.body).toEqual("Seeder successfully delete all stores")

    })

    it('User authentication failure', async () => {
        await api
            .get('/api/stores')
            .auth('Fake@username.com', 'fakePass')
            .expect(401)
            .expect({ message: 'Invalid Authentication Credentials' })

    })

})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})