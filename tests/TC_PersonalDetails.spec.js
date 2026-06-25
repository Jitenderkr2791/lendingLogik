import { test, expect } from '@playwright/test';
import PersonalDetails from '../pages/PersonalDetails.js';
import ContactVerification from '../pages/contactVerification.js';
import { landingPageUrl } from '../config.js';
import BankDetails from '../pages/bankDetails.js';
import IdentityVerificationMethod from '../pages/IdentityVerification.js';
import IncomeAndExpenseMethod from '../pages/incomeAndExpense.js';
import BankStatementMethod from '../pages/BankStatement.js';

import fs from 'fs';


const testData = JSON.parse(fs.readFileSync(`./data/users.json`, 'utf-8'));

test.describe.serial('Personal Details Page Tests', () => {
  let page;
  let personalDetails;
  let contactVerification;
  let context;
  let bankDetails;
  let identityVerification;
  let incomeAndExpense;
  let bankStatementUpload

  //  Create a single browser context for all tests (shared state)
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    personalDetails = new PersonalDetails(page);
    contactVerification = new ContactVerification(page);
    bankDetails = new BankDetails(page);
    identityVerification = new IdentityVerificationMethod(page);
    incomeAndExpense = new IncomeAndExpenseMethod(page);
    bankStatementUpload = new BankStatementMethod(page);
    await page.goto(landingPageUrl);        // Go to application start page once
  });

  //  Step 1 - Fill Personal Details
  test('Step 1 - Fill all Personal Details', async () => {
    await personalDetails.fillPersonalDetailsForm();
    console.log(' Personal Details form filled successfully.');
  });

  
  //  Step 2 - Verify Email and Fill Contact Details (continues from previous state)
  test('Step 2 - Verify Email and Fill Contact Details', async () => {
    await expect(contactVerification.getEmailVerificationMessageLocator()).toBeVisible();
    await expect(contactVerification.getEmailAddressLocator(testData.emailAddress)).toBeVisible();
    await contactVerification.contactDetailsForm();
    console.log(' Contact Verification form filled successfully.');
  });


test('Step 3 - Fill all Bank Details', async () => {
    await bankDetails.fillBankDetailsForm();
    console.log(' Personal  bank Details form filled successfully.');
  });


  test('Step 4 - Fill all Identification Details', async () => {
    await identityVerification.fillIdentityVerificationForm();
    console.log('Identity Details form filled successfully.');
  });


   test('Step 5 - Fill all Income and Expense Details', async () => {
    await incomeAndExpense.fillIncomeAndExpenseForm();
    console.log('Income and Expense Details form filled successfully.');
  });

  test('Step 6 - Fill all Bank Statement Upload Details', async () => {
    await bankStatementUpload.fillBankStatement();
    console.log('Bank Statement Upload Details form filled successfully.');
  });

  
  
  //  Close context after all tests
  test.afterAll(async () => {
    await context.close();
  });
});
