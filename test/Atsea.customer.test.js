const chai = require('chai');
const statusCode = require('http-status-codes');
const agent = require('superagent');

const { expect } = chai;
let customerID;
const name = 'Prueba2 Vallery';
const username = 'prueba2';

describe('Consumer Request', () => {
  it('Create consumer', async () => {
    const response = await agent.post('http://localhost:8080/api/customer/')
      .send({
        customerId: 0,
        name,
        address: '144 Townsend, San Francisco 99999',
        email: 'prueba2@example.com',
        phone: '513 222 5555',
        username,
        password: 'prueba2password',
        enabled: 'true',
        role: 'USER'
      });
    expect(response.status).to.equal(statusCode.CREATED);
    customerID = JSON.parse(response.text).customerId;
  });
  it('Get consumer by ID', async () => {
    const response = await agent.get(`http://localhost:8080/api/customer/${customerID}`);
    expect(response.status).to.equal(statusCode.OK);
    expect(JSON.parse(response.text).customerId).to.equal(customerID);
  });

  it('Consume login service', async () => {
    const response = await agent.post('http://localhost:8080/login/')
      .send({ username: '12345', password: '12345' });
    expect(response.status).to.equal(statusCode.OK);
  });
});
