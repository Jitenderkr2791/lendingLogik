import BasePage from './basePage.js';
import fs from 'fs';
import BankStatementLocator from '../pageobjects/BankStatementLocator.js';


const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

export default class BankStatementMethod extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  
  async enterBankUsername() {
    await this.waitAndType(
      BankStatementLocator.BankUsername,
      testData.BankUsername
    );
  }

    async enterBankPassword() {
    await this.waitAndType(
      BankStatementLocator.BankPassword,
      testData.BankPassword
    );
  }

  async clickBankLoginButton() {
    return await this.waitAndClick(
      BankStatementLocator.BankLoginButton,
      testData.notEnabledText
    );
  }


 

  async fillBankStatement() {
    const steps = [
      () => this.enterBankUsername(),
      () => this.enterBankPassword(),
      () => this.clickBankLoginButton(),
      
    ];

    for (const step of steps) {
      await step();
      //await this.wait(1000);
      await this.page.waitForLoadState('networkidle');
    }
  }}

