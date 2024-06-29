const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User } = require("../src/Model/user_schema");
require('dotenv').config();

const USER_TEST_USERNAME=process.env.USER_TEST_USERNAME;
const USER_TEST_PASS=process.env.USER_TEST_PASS;
const USER_TEST_EMAIL=process.env.USER_TEST_EMAIL;
const NOT_USER_EMAIL=process.env.NOT_USER_EMAIL;

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_URI);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe('User Registration', () => {
    it('should create a new user when valid data is provided', async () => {
        const response = await request(app)
            .post('/user/signup')
            .send({ Username: USER_TEST_USERNAME, Email: USER_TEST_EMAIL, Password: USER_TEST_PASS })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('userId');
        expect(response.body).toHaveProperty('redirectUrl');
    }, 10000);

    it('should return 400 Bad Request if required fields are missing', async () => {
        const response = await request(app)
            .post('/user/signup')
            .send({ Username: 'testuser' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toHaveProperty('error');
    });
});

describe('User Login', () => {
    it('should log in a user with valid credentials', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({ Email: USER_TEST_EMAIL, Password: USER_TEST_PASS })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        if (response.status === 200) {
            expect(response.body).toHaveProperty('message', "Login successful")
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('Username');
            expect(response.body).toHaveProperty('Email');
        } else if (response.status === 401) {
            expect(response.body).toHaveProperty('message');
        }
    });

    it('should return 404 Not Found if user does not exist', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({ Email: NOT_USER_EMAIL, Password: USER_TEST_PASS })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404);

        expect(response.body).toHaveProperty('message', 'User not found');
    });
});

describe('User Deletion', () => {
    let userIdToDelete;

    beforeEach(async () => {
        const testUser = await User.create({
            Username: USER_TEST_USERNAME,
            Email: USER_TEST_EMAIL,
            Password: USER_TEST_PASS,
        });
        userIdToDelete = testUser._id;
    });

    afterEach(async () => {
        await User.findByIdAndDelete(userIdToDelete);
    });

    it('should delete user with valid user ID', async () => {
        const response = await request(app)
            .delete(`/user/deleteUser/${userIdToDelete}`)
            .expect(200);

        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });

    it('should return 400 Bad Request if user ID is invalid', async () => {
        const invalidUserId = 'invalidUserId';

        const response = await request(app)
            .delete(`/user/deleteUser/${invalidUserId}`)
            .expect(400);

        expect(response.body).toHaveProperty('error', 'Invalid user ID');
    });
});
