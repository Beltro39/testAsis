import { browser, $, ExpectedConditions } from 'protractor';
import { post } from 'superagent';
import * as chai from 'chai';
const expect = chai.expect
import * as Module from '../../src/test-ui';
import { protractor } from 'protractor/built/ptor';

let userName = 0;
let urlBase = "http://3.16.232.152:8080";

describe('Buying a Product', () => {
  describe('Opening Page', () => {
    beforeEach(async () => {
      await browser.get(urlBase);
      await browser.sleep(3000);
      userName = Math.floor(Math.random() * 10000);
      const customer = {
        "customerId" : 0,
        "name"       : "Sally Vallery",
        "address"    : "144 Townsend, San Francisco 99999",
        "email"      : "sally@example.com",
        "phone"      : "513 222 5555",
        "username"   : userName.toString(),
        "password"   : "sallypassword",
        "enabled"    : "true",
        "role"       : "USER"
      };
      await post(`${urlBase}/api/customer/`)
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json')
        .send(customer)
        .catch( error => { console.log(error.message)});
    });

    it('Checking the title', async () => {
      const title = await browser.getTitle();
      expect(title).to.equal('Atsea Shop');
    });
  });

  describe('Logging', () => {

    const singUp: Module.SignUp = new Module.SignUp();
    const createCustomer: Module.CreateCustomer = new Module.CreateCustomer();
    const backPage: Module.BackPage = new Module.BackPage();
    const EC = protractor.ExpectedConditions;
    it('Customer logged in', async () => {
        await singUp.signUpMenu();
        await createCustomer.createCustomer();
  
        await browser.wait(EC.elementToBeClickable($('.successButton > button:nth-child(1)')), 3000);
        await backPage.backPage();
    });
  });

  describe('To select the product to the cart', () => {

    const addItem: Module.AddItem = new Module.AddItem();

    it("Experimental added to the cart", async () => {
      await addItem.addItem();
    });
  });

  describe('Payment form', () => {
    const PaymentForm: Module.PaymentForm = new Module.PaymentForm();

    it('Fill form completed', async () => {
        await PaymentForm.createOrderOption();
    });
  });

  describe('Check order status', () => {
    const CheckOrderSummary: Module.CheckOrderSummary = new Module.CheckOrderSummary();

    it('Check order status', async () => {
      browser.sleep(15000);
      ExpectedConditions.presenceOf(CheckOrderSummary.checkOrderStatus());
    });
  });
});