const request = require('supertest');
const app = require('../app')



describe('prayuth', () => {
    test('response must be 200', async () => {
        const result = await request(app).get('/student/getall')
        expect(result.statusCode).toBe(200)

    })


})


describe('GET available student', () => {
    test('response must be 200', async () => {
        const result = await request(app).get('/student/getall')
        expect(result.statusCode).toBe(200)

    })


})
