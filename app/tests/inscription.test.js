const request = require('supertest');
const babel = require('@babel/polyfill');
const app = require('../server');

describe('inscription', () => {
    describe('get /inscription', () => {
        it('doit retourner le code 200', async () => {
            const response = await request(app).get('/inscription');
            expect(response.status).toBe(200);
        });
    });
});