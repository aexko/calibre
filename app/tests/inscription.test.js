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

    describe('get /inscription:nomUtilisateur', () => {
        it('doit retourner existant si un compte avec le même nom d\'utilisateur existe', async () => {
            const response = await request(app).get('/inscription/saghGGabb');
            expect(response.body.titre).toEqual('existant');
        });
    });
    describe('get /inscription:nomUtilisateur', () => {
        it('doit retourner succes si un compte avec le même nom d\'utilisateur n existe pas', async () => {
            const response = await request(app).get('/inscription/admin');
            expect(response.body.titre).toEqual('succes');
        });
    });
});