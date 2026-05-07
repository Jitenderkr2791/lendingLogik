import BasePage from './basePage.js';
import fs from 'fs';
import IncomeAndExpenseLocator from '../pageobjects/IncomeAndExpenseLocator.js'; 


const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

export default class IncomeAndExpenseMethod extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async selectEmploymentType() {
    await this.selectValueFromDropdown(
      IncomeAndExpenseLocator.EmploymentType,
      testData.EmploymentType
    );
  }

 async enterNetIncome() {
    await this.waitAndType(IncomeAndExpenseLocator.NetIncomeInput, testData.NetIncomeInput);
  }


  async selectPayFrequency() {
    await this.selectValueFromDropdown(
      IncomeAndExpenseLocator.PayFrequency,
      testData.PayFrequency
    );
  }

 async enterNextPaymentDate() {
    await this.waitAndType(IncomeAndExpenseLocator.NextPaymentDate, testData.NextPaymentDate);
  }
  async selectMonthlyExpenses() {
    await this.selectValueFromDropdown(
      IncomeAndExpenseLocator.MonthlyExpenses,
      testData.MonthlyExpenses
    );
  }
 async clickSubmitApplicationButton() {
    return await this.waitAndClick(
      IncomeAndExpenseLocator.SubmitApplicationButton,
      testData.notEnabledText
    );
  }



  async fillIncomeAndExpenseForm() {
    const steps = [
      () => this.selectEmploymentType(),
      () => this.enterNetIncome(),
      () => this.selectPayFrequency(),
      () => this.enterNextPaymentDate(),
      () => this.selectMonthlyExpenses(),
      () => this.clickSubmitApplicationButton(),
    ];

    for (const step of steps) {
      await step();
      await this.wait(200);
    }
  }}

