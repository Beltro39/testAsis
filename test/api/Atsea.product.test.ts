import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;
let urlBase = 'http://3.16.232.152:8080';

describe('Product Requests', () => {
  it('Get all products', async () => {
    const response = await get(`${urlBase}/api/product/`)
    .set('User-Agent', 'agent')
    .set('Content-Type', 'application/json');
    expect(response.status).to.equal(StatusCodes.OK);
  });
  it('Get single product', async () => {
    const id = 1;
    const response = await get(`${urlBase}/api/product/${id}/`)
    .set('User-Agent', 'agent')
    .set('Content-Type', 'application/json');;
    expect(response.status).to.equal(StatusCodes.OK);
    expect(JSON.parse(response.text).productId).to.equal(id);
  });
});

