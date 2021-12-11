const chai = require('chai');
const statusCode = require('http-status-codes');
const agent = require('superagent');

const { expect } = chai;

describe('Product Requests', () => {
  it('Get all products', async () => {
    const response = await agent.get('http://localhost:8080/api/product/');
    expect(response.status).to.equal(statusCode.OK);
  });
  it('Get single product', async () => {
    const id = 1;
    const response = await agent.get(`http://localhost:8080/api/product/${id}`);
    expect(response.status).to.equal(statusCode.OK);
    expect(JSON.parse(response.text).productId).to.equal(id);
  });
});
