import request from 'supertest';
import app from '../../src/app';
import { readLatestPassword } from '../util/mailReader';

describe('Test user register', () => {

    test('It should block register request when no body is provided.', () => {
        return request(app)
            .post('/api/user/register')
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block register request when user is already in user database.', () => {
        return request(app)
            .post('/api/user/register')
            .send({ email: 'Lori.Crist@gmail.com' })
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('User already exist');
            });
    });

    test('It should block register request when user is not member.', () => {
        return request(app)
            .post('/api/user/register')
            .send({ email: 'Lori.Not@gmail.com' })
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Membership not found');
            });
    });

    test('It should proceed register.', () => {
        return request(app)
            .post('/api/user/register')
            .send({ email: 'Gage_Gislason@gmail.com' })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Registration success');
            });
    });

    test('It should process the login request with default password set to true.', () => {
        const password = readLatestPassword('Gage_Gislason@gmail.com');

        return request(app)
            .post('/api/user/login')
            .send({ email: 'Gage_Gislason@gmail.com', password })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Login success');
                expect(res.body.user.isDefaultPassword).toBe(true);
            });
    });
});
