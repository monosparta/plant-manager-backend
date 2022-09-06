import request from 'supertest';
import app from '../../src/app';
import { renameSync, unlinkSync, writeFileSync } from 'fs';
import { readLatestPassword } from '../util/mailReader';

beforeAll(() => {
    renameSync('./fakeMemberShip.json', './fakeMemberShip.backup.json');
    renameSync('./mailWhitelist.json', './mailWhitelist.backup.json');

    const membership = [
        {
            ID: 'ae4b61eb-92b7-4f87-9358-7a2cbbf03a81',
            name: 'Gage',
            email: 'Gage_Gislason@gmail.com'
        }
    ];

    const memberJson = JSON.stringify(membership, null, 4);
    writeFileSync('./fakeMemberShip.json', memberJson, 'utf8');

    const mailWhiteList = [];

    const mailWhiteListJson = JSON.stringify(mailWhiteList, null, 4);
    writeFileSync('./mailWhitelist.json', mailWhiteListJson, 'utf8');

});

afterAll(() => {
    unlinkSync('./fakeMemberShip.json');
    unlinkSync('./mailWhitelist.json');
    renameSync('./fakeMemberShip.backup.json', './fakeMemberShip.json');
    renameSync('./mailWhitelist.backup.json', './mailWhitelist.json');
});

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