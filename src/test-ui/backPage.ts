import { ElementFinder, $} from 'protractor';

export class BackPage {
  private continueShoppingButton: ElementFinder;

  constructor () {
    this.continueShoppingButton = $('.successButton > button:nth-child(1)');
  }

  public async backPage(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}