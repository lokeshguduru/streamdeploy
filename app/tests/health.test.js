// Unit tests for the health endpoint
const request = require('supertest');
const app = require('../src/index');

describe('Health Endpoint', () => {
  it('should return 200 and status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });

  it('should return JSON content type', async () => {
    const response = await request(app).get('/health');
    expect(response.headers['content-type']).toMatch(/json/);
  });
});