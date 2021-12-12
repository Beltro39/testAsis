import { ElementFinder, $ } from 'protractor';

export class SignUp {
  private signUpButton: ElementFinder;

  constructor () {
    
    this.signUpButton = $('.buttonSection > div > button:nth-child(1)');
  }

  public async signUpMenu(): Promise<void> {

    await this.signUpButton.click();
  }
}