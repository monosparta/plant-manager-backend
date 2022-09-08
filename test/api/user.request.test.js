import request from 'supertest';
import app from '../../src/app';

let token;
const invalidToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFhNjlkNzE0LTgxMWQtNDI1Ni05YmJjLTJhNzJiYzM4ZmNlYiIsImlhdCI6MTY2MjM2Mzc5OSwiZXhwIjoxNjYyMzY3Mzk5fQ.wIpx49ki84uy20f8zrzztexRPR8LQTbglxqCRrecpe0';

beforeAll(async () => {
    const res = await request(app)
        .post('/api/user/login')
        .send({ email: 'Lori.Crist@gmail.com', password: 'demo' });
    token = res.body.token;
});

describe('Test call api without token', () => {
    test('It should block GET /user when no header set.',  () => {
        return request(app)
            .get('/api/user')
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe('Invalid header');
            });
    });

    test('It should block GET /user when header is incomplete. (1/2)',  () => {
        return request(app)
            .get('/api/user')
            .set('Auth-Method', 'JWT')
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe('Invalid header');
            });
    });

    test('It should block GET /user when header is incomplete. (2/2)',  () => {
        return request(app)
            .get('/api/user')
            .set('Auth', invalidToken)
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe('Invalid header');
            });
    });
});

describe('Test call api with invalid token', () => {
    test('It should block GET /user when JWT token is invalid.',  () => {
        return request(app)
            .get('/api/user')
            .set('Auth-Method', 'JWT')
            .set('Auth', invalidToken)
            .expect(401)
            .then(res => {
                expect(res.body.message).toBe('Invalid JWT token');
            });
    });
});

describe('Test auth check', () => {
    test('It should proceed GET /user after login.', () => {
        return request(app)
            .get('/api/user')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});
