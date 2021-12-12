import { $, ElementFinder, browser, element, by } from 'protractor';

export class PaymentForm {
  private createOrder: ElementFinder;
  constructor () {
    this.createOrder = $('.infoButton > button:nth-child(2)');
  }

  public async createOrderOption(): Promise<void> {
    await element(by.name("firstName")).sendKeys('Sally');
    browser.sleep(5000);
    await element(by.name("lastName")).sendKeys('Vallery');
    browser.sleep(5000);
    await element(by.name("cardNumber")).click();
    await element(by.name("cardNumber")).sendKeys('1234567890');
    browser.sleep(5000);
    await element(by.name("cvv")).click();
    await element(by.name("cvv")).sendKeys('084');
    browser.sleep(5000);
    await element(by.name("expirationDate")).click();
    await element(by.name("expirationDate")).sendKeys('11/25');
    browser.sleep(5000);
    await element(by.name("company")).click();
    await element(by.name("company")).sendKeys('San Francisco');
    browser.sleep(5000);
    await element(by.name("title")).click();
    await element(by.name("title")).sendKeys('boss');
    browser.sleep(5000);
    await element(by.name("address")).click();
    await element(by.name("address")).sendKeys('144 Townsend, San Francisco 99999');
    browser.sleep(5000);
    await element(by.name("city")).click();
    await element(by.name("city")).sendKeys('San Francisco');
    browser.sleep(5000);
    await this.createOrder.click();
  }
}