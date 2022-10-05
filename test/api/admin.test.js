import request from 'supertest';
import app from '../../src/app';

let token, userToken;

beforeAll(async () => {
    const res = await request(app)
        .post('/api/user/login')
        .send({ email: 'Jeanne_Ondricka@gmail.com', password: 'demo' });
    token = res.body.token;

    const resUser = await request(app)
        .post('/api/user/login')
        .send({ email: 'Eula_Ritchie@hotmail.com', password: 'demo' });
    userToken = resUser.body.token;
});

describe('Test user permission and rented List', () => {
    test('It should block admin rented List request sent by user.', async () => {
        return request(app)
            .get('/api/admin/rentedInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', userToken)
            .expect(403)
            .then((res) => {
                expect(res.body.message).toBe('Permission denied!');
            });
    });
    test('It should proceed admin rented List request sent by admin.', () => {
        return request(app)
            .get('/api/admin/rentedInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test wait list', () => {
    test('It should proceed admin wait list request sent by admin.', () => {
        return request(app)
            .get('/api/admin/waitList')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test rented amount', () => {
    test('It should proceed admin rented amount request sent by admin.', () => {
        return request(app)
            .get('/api/admin/rentedAmount')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test take rent', () => {
    test('It should block admin mark rent taken request when rent is not found.', () => {
        return request(app)
            .put('/api/admin/rent/0')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Rent not found');
            });
    });

    test('It should proceed admin mark rent taken request sent by admin.', () => {
        return request(app)
            .put('/api/admin/rent/1')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });

    test('It should block admin mark rent taken request when rent container is already taken.', () => {
        return request(app)
            .put('/api/admin/rent/1')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('Rent already taken');
            });
    });
});

describe('Test add admin', () => {
    test('It should block admin add admin request when no body is provided.', () => {
        return request(app)
            .post('/api/admin/addAdmin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block admin add admin request when body is incomplete. (1/2)', () => {
        return request(app)
            .post('/api/admin/addAdmin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ email: 'Lori.Crist@gmail.com' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block admin add admin request when body is incomplete. (2/2)', () => {
        return request(app)
            .post('/api/admin/addAdmin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Lori' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block admin add admin request when email is invalid.', () => {
        return request(app)
            .post('/api/admin/addAdmin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Lori', email: 'not-email' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid email');
            });
    });

    test('It should block admin add admin request when user is already in user database.', () => {
        return request(app)
            .post('/api/admin/addAdmin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Lori', email: 'Lori.Crist@gmail.com' })
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('User already exist');
            });
    });

    test('It should proceed admin delete rent request sent by admin.', () => {
        return request(app)
            .post('/api/admin/addAdmin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Test', email: process.env.EMAIL_ACCOUNT })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Registration success');
            });
    });

    test('It should proceed admin update member list request sent by admin.', () => {
        return request(app)
            .put('/api/admin/members')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful.');
            });
    });
});
