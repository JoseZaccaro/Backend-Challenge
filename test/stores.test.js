const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app.js')
const api = supertest(app)

jest.setTimeout(15000)

test('Generate Stores for Test', async () => {
    const res = await api
        .post('/api/seeder')
        .auth('test@koibanx.com', 'test123')
        .expect(200)
    expect(res.body).toEqual("Seeder successfully poblate with 150 new stores")
})

test('Many Stores are returned as json', async () => {
    const res = await api
        .get('/api/stores')
        .auth('test@koibanx.com', 'test123')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data.length).toBeGreaterThanOrEqual(2)
})

test('Delete all stores', async () => {
    const res = await api
        .delete('/api/seeder')
        .auth('test@koibanx.com', 'test123')
        .expect(200)
        
    expect(res.body).toEqual("Seeder successfully delete all stores")

})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})