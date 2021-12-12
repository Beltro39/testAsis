import { ElementFinder, $, ExpectedConditions, browser} from 'protractor';

export class AddItem {
  private addItemButton: ElementFinder;
  private checkOutButton: ElementFinder;

  constructor () {
    
    this.addItemButton = $('.tileAdd > button:nth-child(1)');
    this.checkOutButton = $('.checkout-button > a:nth-child(1)');
  }

  public async addItem(): Promise<void> {

    await this.addItemButton.click();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.checkOutButton), 5000);
    await this.checkOutButton.click();
  }
}