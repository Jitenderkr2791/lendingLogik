import BankDetailsLocators from "../pageobjects/bankDetails";  // ✅ single import
import BasePage from "./basePage";
import fs from "fs";

const testData = JSON.parse(fs.readFileSync("./data/users.JSON", "utf-8"));

export default class BankDetails extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async VerifyBSBNumberLable() 
  {
    return await this.isElementVisible(BankDetailsLocators.BSBNumberLable,testData.notVisibleText);
  }

  async VerifyAccountNumberLable() 
  {
    return await this.isElementVisible(BankDetailsLocators.BankAccountNumberLable,testData.notVisibleText);
  }

  async enterBSBNumber() 
  {
    await this.waitAndType(BankDetailsLocators.BSBNumber,testData.BSBNumberInputData);
  }

  async enterBankAccountNumber() 
  {
    await this.waitAndFill(BankDetailsLocators.BankAccountNumber,testData.bankAccountNumber);
  }

  async VerifyBackbutton() {
    return await this.isElementVisible(BankDetailsLocators.Backbutton,testData.notVisibleText);
  }

  async clickcontinueButton() {
    return await this.waitAndClick(BankDetailsLocators.Verifyandcontinuebuttonbankdetails,testData.notEnabledText);
  }

  async fillBankDetailsForm() {
    const steps = [
      () => this.VerifyBSBNumberLable(),
      () => this.VerifyAccountNumberLable(),
      () => this.enterBSBNumber(),
      () => this.enterBankAccountNumber(),
      () => this.VerifyBackbutton(),
      () => this.clickcontinueButton(),
    ];

    for (const step of steps) {
      await step();
      await this.wait(200);
    }
  }
}
