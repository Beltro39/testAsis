import { browser, $, ExpectedConditions } from 'protractor';
import { del } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';
const expect = chai.expect
import * as Module from '../../src/test-ui';
import { protractor } from 'protractor/built/ptor';

let urlBase = "http://3.16.232.152:8080";

describe('Buying a Product', () => {
  describe('Opening Page', () => {
    beforeEach(async () => {
      await browser.get(urlBase);
      await browser.sleep(3000);
    });

    it('Checking the title', async () => {
      const title = await browser.getTitle();
      expect(title).to.equal('Atsea Shop');
    });
  });

  describe('Delete customers', () => {
    let response;
    before(async () => {
      response = await del(`${urlBase}/api/customer/`)
        .set('User-Agent', 'agent')
    });
    it('Customers successfully delated ', () => {
      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
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

    it("Product added to the cart", async () => {
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