import request from 'supertest';
import app from '../../src/app';
import { readLatestRentId } from '../util/mailReader';

let token;

beforeAll(async () => {
    const res = await request(app)
        .post('/api/user/login')
        .send({ email: 'Jeanne_Ondricka@gmail.com', password: 'demo' });
    token = res.body.token;
});

describe('Test user rent list', () => {
    test('It should return a list of other rents.', () => {
        return request(app)
            .get('/api/rent/list/others')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test user rent request', () => {
    test('It should proceed the rent request.', () => {
        return request(app)
            .post('/api/rent/register')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Registration successful');
                expect(res.body.waiting).toBe(false);
            });
    });

    test('It should proceed the rent request and add to waiting list.', () => {
        return request(app)
            .post('/api/rent/register')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Registration successful');
                expect(res.body.waiting).toBe(true);
            });
    });
});

describe('Test user filling rent form', () => {
    test('It should block plant info when no body is provided.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block plant info when body is incorrect (1/2).', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', readLatestRentId('Jeanne_Ondricka@gmail.com'))
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block plant info when body is incorrect (2/2).', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block plant info when requested rent is not found.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', 0)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Requested rent not found');
            });
    });

    test('It should block invalid image.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', readLatestRentId('Jeanne_Ondricka@gmail.com'))
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/invalidImage.7z`)
            .expect(400);
    });

    test('It should block large image.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', readLatestRentId('Jeanne_Ondricka@gmail.com'))
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/largeImage.jpg`)
            .expect(400);
    });

    test('It should proceed plant info.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', readLatestRentId('Jeanne_Ondricka@gmail.com'))
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });

    test('It should block plant info when request send data second time.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', readLatestRentId('Jeanne_Ondricka@gmail.com'))
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('Plant already exist');
            });
    });
});