

// bankDetails.js

const BankDetailsLocators = {
  BSBNumberLable: "//label[normalize-space()='BSB Number']",
  BankAccountNumberLable: "//label[normalize-space()='Bank Account Number']",
  BSBNumber: "//input[@placeholder='BSB number']",
  BankAccountNumber: "//input[@placeholder='Account number']",
  Backbutton: "//button[normalize-space()='Back']",
  Verifyandcontinuebuttonbankdetails: "(//button[@data-stage='bank'][normalize-space()='Continue'])[1]"
};

export default BankDetailsLocators;
