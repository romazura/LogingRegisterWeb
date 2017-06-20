import { browser, element, by } from 'protractor';

export class MyAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root app-frontpage h2')).getText();
  }
}
