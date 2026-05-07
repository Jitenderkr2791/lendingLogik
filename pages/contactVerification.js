import BasePage from './basePage.js';
import fs from 'fs';
import ContactVerificationLocators from '../pageobjects/contactVerification.js'; // ✅ single import

const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

export default class ContactVerification extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async verifyLogoVisible() {
    return await this.isElementVisible(
      ContactVerificationLocators.Logo,
      testData.notVisibleText
    );
  }

  getEmailVerificationMessageLocator() {
    return this.page.locator(ContactVerificationLocators.EmailVerificationMessage);
  }

  getEmailAddressLocator(email) {
    return this.page.locator(`strong:text-is("${email}")`);
  }

  async enterEmailVerificationCode() {
    await this.waitAndType(
      ContactVerificationLocators.Emailverificationcodeinputfield,
      testData.emailVerificationCode
    );
  }

  async enterMobileVerificationCode() {
    await this.waitAndType(
      ContactVerificationLocators.MobileNumberverificationcodeinputfield,
      testData.mobileNumberVerificationCode
    );
  }

  async enterPassword() {
    await this.waitAndType(
      ContactVerificationLocators.Passwordinputfield,
      testData.password
    );
  }

  async enterConfirmPassword() {
    await this.waitAndType(
      ContactVerificationLocators.ConfirmPasswordInputField,
      testData.confirmPassword
    );
  }

  async clickVerifyAndContinueButton() {
    return await this.waitAndClick(
      ContactVerificationLocators.Verifyandcontinuebutton,
      testData.notEnabledText
    );
  }

  async clickBackButton() {
    return await this.waitAndClick(
      ContactVerificationLocators.Backbutton,
      testData.notEnabledText
    );
  }

  async contactDetailsForm() {
    await this.verifyLogoVisible();

    const steps = [
      () => this.enterEmailVerificationCode(),
      () => this.enterMobileVerificationCode(),
      () => this.enterPassword(),
      () => this.enterConfirmPassword(),
      () => this.clickVerifyAndContinueButton(),
    ];

    for (const step of steps) {
      await step();
      await this.wait(200);
    }
  }
}
