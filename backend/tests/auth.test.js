const request = require('supertest');
const app = require('../src/app');

describe('Auth endpoints', () => {

  test('POST /auth/register - should return 201 with valid data', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@test.com`,
        password: '123456'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email');
  });

  test('POST /auth/register - should return 409 if email already exists', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Sebastian Castro',
        email: 'sebas@test.com',
        password: '123456'
      });
    expect(res.status).toBe(409);
  });

  test('POST /auth/register - should return 400 if fields are missing', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'alguien@test.com' });
    expect(res.status).toBe(400);
  });

  test('POST /auth/login - should return 200 and token with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'sebas@test.com',
        password: '123456'
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /auth/login - should return 401 with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'sebas@test.com',
        password: 'wrongpassword'
      });
    expect(res.status).toBe(401);
  });

  test('POST /appointments - should return 401 without token', async () => {
    const res = await request(app)
      .post('/appointments')
      .send({
        doctor_id: 1,
        date: '2026-06-15',
        time: '09:00'
      });
    expect(res.status).toBe(401);
  });

});