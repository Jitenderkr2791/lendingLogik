import BasePage from './basePage.js';
import fs from 'fs';
import IdentityVerificationLocators from '../pageobjects/IdentityVerificationLocator.js';  // ✅ Single import

const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

export default class IdentityVerificationMethod extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async selectPrimaryProofofIdentity() {
    await this.selectValueFromDropdown(
      IdentityVerificationLocators.IdentityDropdown,
      testData.PrimaryProofofIdentity
    );
  }
async enterMedicareCardNumber() {
    await this.waitAndType(IdentityVerificationLocators.MedicareCardnumberlocator, testData.MedicareCardNumber);
  }

  async enterDrivingLicensenumber() {
    await this.waitAndType(IdentityVerificationLocators.DrivingLicensenumber, testData.DrivingLicensenumber);
  }

   async enterMedicareCardExpiryDate() {
    await this.waitAndType(IdentityVerificationLocators.MedicareCardExpiryDate, testData.MedicareCardExpiryDate);
  }

  async selectSecondaryProofofIdentity() {
    await this.selectValueFromDropdown(
      IdentityVerificationLocators.SecondaryProofofIdentity,
      testData.SecondaryProofofIdentity
    );
  }

  async enterPassportnumber() {
    await this.waitAndType(IdentityVerificationLocators.PassportNumberInput, testData.PassportNumber);
  }

  
  async enterPassportExpiryDate() {
    await this.waitAndType(IdentityVerificationLocators.PassportExpiryDate, testData.PassportExpiryDate);
  }

    async clickcontinueButton() {
    return await this.waitAndClick(
      IdentityVerificationLocators.ContinueButtonIdentity,
      testData.notEnabledText
    );
  }

async fillIdentityVerificationForm() {
    const steps = [
      () => this.selectPrimaryProofofIdentity(),
       () => this.enterMedicareCardNumber(),
       () => this.enterDrivingLicensenumber(),
       () => this.enterMedicareCardExpiryDate(),
       () => this.selectSecondaryProofofIdentity(),
       () => this.enterPassportnumber(),
       () => this.enterPassportExpiryDate(),
       () => this.clickcontinueButton(),
    ];

    for (const step of steps) {
      await step();
      await this.wait(200);
    }
  }


  }
  