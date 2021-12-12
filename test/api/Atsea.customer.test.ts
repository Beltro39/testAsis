import { post, get, put, del } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

let customerId = 0;
let customerName = "";
let customerUsername = "";
let urlBase = 'http://3.16.232.152:8080';

describe('Create customer tests', () => {
    describe('Creating customer', () => {
        it('Customer is created', async () => {
            const customer = {
              "customerId" : 0,
              "name"       : "Sally Vallery",
              "address"    : "144 Townsend, San Francisco 99999",
              "email"      : "sally@example.com",
              "phone"      : "513 222 5555",
              "username"   : "sallyv",
              "password"   : "sallypassword",
              "enabled"    : "true",
              "role"       : "USER"
            };
            customerName = customer.name;
            customerUsername = customer.username;
            const response = await post(`${urlBase}/api/customer/`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer);
            expect(response.status).to.equal(StatusCodes.CREATED);
            expect(response.body).to.have.property('customerId');
            customerId = response.body.customerId;
        });
    });

    describe('Creating an invalid customer', () => {
        it('Customer is not created', async () => {
            const customer = {
                "customerId": customerId,
                "name"      : customerName,
                "address"   : "144 Townsend, San Francisco 99999",
                "email"     : "sally@example.com",
                "phone"     : "513 222 5555",
                "username"  : customerUsername,
                "password"  : "sallypassword",
                "enabled"   : "true",
                "role"      : "USER"
            };
            await post(`${urlBase}/api/customer/`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer)
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.CONFLICT);
                })
        });
    });
});

describe('Get customer tests', () => {
    describe('Getting a customer with a valid id', () => {
        it('Customer obtained', async () => {
            const response = await get(`${urlBase}/api/customer/${customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('customerIf');
            expect(response.body.customerIf).to.equal(customerId);
        });
    });

    describe('Getting a customer with an invalid id', () => {
        let notFoundId = -1;
        it('Customer was not obtained', async () => {
            await get(`${urlBase}/api/customer/${notFoundId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('Getting a customer with valid name', () => {
        it('Customer obtained', async () => {
            const response = await get(`${urlBase}/api/customer/name=${customerName}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('name');
            expect(response.body.name).to.equal(customerName);
        });
    });

    describe('Getting a customer with an invalid name', () => {
        let notFoundName = "thisNameDoesNotExists";
        it('Customer was not obtained', async () => {
            await get(`${urlBase}/api/customer/name=${notFoundName}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('Getting a customer with valid username', () => {
        it('Customer obtained', async () => {
            const response = await get(`${urlBase}/api/customer/username=${customerUsername}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('username');
            expect(response.body.username).to.equal(customerUsername);
        });
    });

    describe('Getting a customer with an invalid username', () => {
        let notFoundUsername = "thisUsernameDoesNotExists";
        it('Customer was not obtained', async () => {
            await get(`${urlBase}/api/customer/username=${notFoundUsername}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });
});

describe('Update customer tests', () => {
    describe('Updating a valid customer', () => {
        it('Customer updated', async () => {
            const customer = {
                "customerId": customerId,
                "name": "Sally Vallery",
                "address": "my new address",
                "email": "sally@example.com",
                "phone": "phone as string",
                "username": "sallyv",
                "password": "sallynewpassword",
                "enabled": "true",
                "role": "USER"
            };
            const response = await put(`${urlBase}/api/customer/${customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer);
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('customerId');
            expect(response.body.address).to.equal(customer.address);
            expect(response.body.phone).to.equal(customer.phone);
            expect(response.body.password).to.equal(customer.password);
        });
    });

    describe('Updating a valid customer', () => {
        let notFoundId = -100;
        it('Customer updated', async () => {
            const customer = {
                "customerId": notFoundId,
                "name": "Sally Vallery",
                "address": "my new address",
                "email": "sally@example.com",
                "phone": "phone as string",
                "username": "sallyv",
                "password": "sallynewpassword",
                "enabled": "true",
                "role": "USER"
            };

            await put(`${urlBase}/api/customer/${notFoundId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer)
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });
});

describe('Delete customer tests', () => {
    describe('Deleting a customer with a valid id', () => {
        it('Customer deleted', async () => {
            const response = await del(`${urlBase}/api/customer/${customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.NO_CONTENT);
        });
    });

    describe('Deleting a customer by an invalid id', () => {
        let notFoundId = -1;
        it('Customer was not deleted', async () => {
            await del(`${urlBase}/api/customer/${notFoundId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('Deleting all customers', () => {
        it('All customers were deleted', async () => {
            const response = await del(`${urlBase}/api/customer/`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.NO_CONTENT);
        });
    });
});