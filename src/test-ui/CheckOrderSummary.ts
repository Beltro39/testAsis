import { ElementFinder, $ } from 'protractor';

export class CheckOrderSummary {
  private orderStatus: ElementFinder;

  constructor () {
    this.orderStatus = $('.successMessage');
  }
  public checkOrderStatus(): ElementFinder {
    return this.orderStatus;
  }
}