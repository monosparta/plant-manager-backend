import request from 'supertest';
import app from '../../src/app';

describe('Test login with user', () => {
    test('It should block login request when no body is provided.', () => {
        return request(app)
            .post('/api/user/login')
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });
    test('It should block login request when body is incomplete. (1/2)', () => {
        return request(app)
            .post('/api/user/login')
            .send({ email: 'Lori.Crist@gmail.com' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });
    test('It should block login request when body is incomplete. (2/2)', () => {
        return request(app)
            .post('/api/user/login')
            .send({ password: 'demo' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block login request when user is not found.', () => {
        return request(app)
            .post('/api/user/login')
            .send({ email: 'Wiley8@hotmail.com', password: 'demo' })
            .expect(401)
            .then((res) => {
                expect(res.body.message).toBe('Invalid user or password!');
            });
    });

    test('It should block login request when password is incorrect.', () => {
        return request(app)
            .post('/api/user/login')
            .send({ email: 'Lori.Crist@gmail.com', password: 'not-demo' })
            .expect(401)
            .then((res) => {
                expect(res.body.message).toBe('Invalid user or password!');
            });
    });

    test('It should process the login request.', () => {
        return request(app)
            .post('/api/user/login')
            .send({ email: 'Lori.Crist@gmail.com', password: 'demo' })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Login success');
            });
    });

    test('It should process the login request of default root account.', () => {
        return request(app)
            .post('/api/user/login')
            .send({ email: 'root@rental.planter', password: 'root' })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Login success');
            });
    });
});
