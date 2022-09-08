import request from 'supertest';
import app from '../../src/app';
import { readLatestPassword } from '../util/mailReader';

let token;

describe('Test user request reset password', () => {
    test('It should block register request when no body is provided.', () => {
        return request(app)
            .post('/api/user/password')
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block register request when user is not fount.', () => {
        return request(app)
            .post('/api/user/password')
            .send({ email: 'Lori.Not@gmail.com' })
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('User not found');
            });
    });

    test('It should proceed register.', () => {
        return request(app)
            .post('/api/user/password')
            .send({ email: 'Lori.Crist@gmail.com' })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Request success');
            });
    });
});

describe('Test user change password', () => {
    test('It should process the login request with default password set to true.', () => {
        const password = readLatestPassword('Lori.Crist@gmail.com');

        return request(app)
            .post('/api/user/login')
            .send({ email: 'Lori.Crist@gmail.com', password })
            .expect(200)
            .then((res) => {
                token = res.body.token;
                expect(res.body.message).toBe('Login success');
                expect(res.body.user.isDefaultPassword).toBe(true);
            });
    });

    test('It should block /user change password request when no body is provided.', () => {
        return request(app)
            .put('/api/user/password')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should procees /user change password request .', () => {
        return request(app)
            .put('/api/user/password')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ password: 'demo' })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Password updated');
            });
    });
});