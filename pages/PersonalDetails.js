import BasePage from './basePage.js';
import fs from 'fs';
import PersonalDetailsLocators from '../pageobjects/personalDetails.js';  // ✅ Single import

const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

export default class PersonalDetails extends BasePage {
  constructor(page) 
  {
    super(page);
    this.page = page;
  }

  async verifyLogoVisible()
   {
    return await this.isElementVisible(PersonalDetailsLocators.Logo,testData.notVisibleText);
  }

  async selectLoanAmount() 
  {
    await this.selectValueFromDropdown(PersonalDetailsLocators.Selectloanamount,testData.loanAmount);
  }

  async selectLoanPurpose() 
  {
    await this.selectValueFromDropdown(PersonalDetailsLocators.Selectloanpurpose,testData.loanPurpose);
  }

  async enterFirstname() 
  {
    await this.waitAndType(PersonalDetailsLocators.Firstname, testData.firstName);
  }

  async enterLastname() 
  {
    await this.waitAndType(PersonalDetailsLocators.Lastname, testData.lastName);
  }

  async enterBirthdate() 
  {
    await this.waitAndType(PersonalDetailsLocators.Birthdate, testData.dateOfBirth);
  }

  async enterMobileNumber() 
  {
    await this.waitAndType(PersonalDetailsLocators.Mobilenumber, testData.mobileNumber);
  }

  async enterEmailAddress() 
  {
    await this.waitAndType(PersonalDetailsLocators.Emailaddress, testData.emailAddress);
  }

  async enterStreetAddress() 
  {
    await this.waitAndType(PersonalDetailsLocators.Streetaddress, testData.streetAddress);
    await this.page.locator(PersonalDetailsLocators.Streetaddress).scrollIntoViewIfNeeded();
  }

  async enterCity()
   {
    await this.waitAndType(PersonalDetailsLocators.City, testData.city);
    await this.page.locator(PersonalDetailsLocators.City).scrollIntoViewIfNeeded();
  }

  async enterPostalCode() 
  {
    await this.waitAndType(PersonalDetailsLocators.Postalcode, testData.postalCode);
    await this.page.locator(PersonalDetailsLocators.Postalcode).scrollIntoViewIfNeeded();
  }

  async enterState()
   {
    await this.waitAndType(PersonalDetailsLocators.State, testData.state);
    await this.page.locator(PersonalDetailsLocators.State).scrollIntoViewIfNeeded();
  }

  async enterCountry() 
  {
    await this.waitAndType(PersonalDetailsLocators.Country, testData.country);
    await this.page.locator(PersonalDetailsLocators.Country).scrollIntoViewIfNeeded();
  }

  async clickContinueButton() 
  {
    return await this.waitAndClick(PersonalDetailsLocators.Continuebutton,testData.notEnabledText);
  }

  async fillPersonalDetailsForm() 
  {
    await this.verifyLogoVisible();

    const steps = [
      () => this.selectLoanAmount(),
      () => this.selectLoanPurpose(),
      () => this.enterFirstname(),
      () => this.enterLastname(),
      () => this.enterBirthdate(),
      () => this.enterMobileNumber(),
      () => this.enterEmailAddress(),
      () => this.enterStreetAddress(),
      () => this.enterCity(),
      () => this.enterPostalCode(),
      () => this.enterState(),
      () => this.enterCountry(),
      () => this.clickContinueButton(),
    ];

    for (const step of steps) 
      {
      await step();
      await this.wait(200);
     // await this.page.waitForLoadState('networkidle');
    }
  }
}
