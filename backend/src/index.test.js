const request = require('supertest');
const app = require('../src/index');

describe('API Health Check', () => {
  test('GET /api/health returns 200 with status OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});

describe('API Message Endpoint', () => {
  test('GET /api/message returns 200 with a message field', async () => {
    const res = await request(app).get('/api/message');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });
});

describe('Unknown Routes', () => {
  test('GET /api/unknown returns 404', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
  });
});
