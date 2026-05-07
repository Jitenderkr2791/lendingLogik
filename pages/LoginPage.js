// pages/LoginPage.js

import BasePage from './basePage.js';
import fs from 'fs';
import loginPageLocators from '../pageobjects/loginPageLocators.js';

const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

export default class LoginPageMethods extends BasePage
{
  constructor(page)
  {
    super(page);
    this.page = page;
    this.homeUrlPattern =/lightning\/setup\/SetupOneHome\/home/i; // Salesforce Home URL Pattern
    this.errorLocator =this.page.locator(loginPageLocators.errorLocator);
    this.otpLocator =this.page.locator(loginPageLocators.otpInput);
  }

  // Enter Username & Password
  async enterCredentials()
  {
    await this.waitAndType(loginPageLocators.userNameInput,userData.userName );
    await this.waitAndType(loginPageLocators.passwordInput,userData.loginPassword);
    await this.waitAndClick(loginPageLocators.loginButton);
  }
  
  async clickVerifyButton()
  { 
    await this.waitAndClick( loginPageLocators.verifyButton);   // Click Verify Button
  }
  
  async clickHavingTrouble()
  {
    await this.waitAndClick(loginPageLocators.havingTrouble);
  }

  async clickDifferentVerificationMethod()
  {
    await this.waitAndClick(loginPageLocators.differentVerificationMethod);
  }

  // Wait For Valid 6 Digit OTP
  async waitForSixDigitOtpFromInput()
   {
      const re = /^\d{6}$/;
      // 120 sec polling
      for (let i = 0; i < 120; i++)
      {
        await this.otpLocator.waitFor({state: 'visible',timeout: 5000 }).catch(() => {});
        const val = (await this.otpLocator.inputValue().catch(() => '')).trim();

        // Valid 6 digit OTP
        if (re.test(val))
        { return val; }
        await this.page.waitForTimeout(1000);
      }
      throw new Error('Timeout waiting for 6-digit OTP.');
   }

  
  // Reusable OTP Flow
  async performOtpFlow(maxOtpAttempts = 3)
  {
    console.log(' Starting OTP Flow...');

    // Wait for OTP Screen
    await this.otpLocator.waitFor({state: 'visible',timeout: 60000});

    for ( let attempt = 1;attempt <= maxOtpAttempts;attempt++)
    {
      console.log(` OTP Attempt #${attempt}`);
      const otp = await this.waitForSixDigitOtpFromInput(); // Wait for OTP input
      console.log(` OTP Entered: ${otp}`);
      await this.otpLocator.fill(otp);   // Fill OTP
      await this.clickVerifyButton();  // Click Verify

      // Wait for Success OR Error
      const result = await Promise.race
      ([
        this.page.waitForURL(this.homeUrlPattern,{ timeout: 20000 }).then(() => 'success').catch(() => null),
        this.errorLocator.waitFor({state: 'visible', timeout: 20000}).then(() => 'error').catch(() => null)
      ]);

      // LOGIN SUCCESS
      if (result === 'success')
      {
        console.log(` Login successful: ${this.page.url()}`);
        return;
      }

      // INVALID OTP
      if (result === 'error')
      {
        const msg = (await this.errorLocator.textContent().catch(() => 'Invalid OTP')).trim();
        console.log(` Invalid OTP: ${msg}`);
        // Clear OTP field
        try
        {
          await this.otpLocator.fill('');
          console.log(' OTP cleared. Please re-enter OTP.');
        }
        catch
        {
          console.log(' Unable to clear OTP field.');
        }
        continue;
      }

      // Fallback URL Check
      if (this.homeUrlPattern.test(this.page.url()))
      {
        console.log(` Login successful (fallback): ${this.page.url()}`);
        return;
      }
      await this.page.waitForTimeout(2000);
    }
    throw new Error(` OTP failed after ${maxOtpAttempts} attempts`); // Max Attempts Failed
  }

  // Manual OTP Login
  async loginWithManualOtp({maxAttempts = 3} = {})
  {
    console.log(' Starting Manual OTP Login...');
    await this.enterCredentials();
    await this.performOtpFlow(maxAttempts);
  }

  // =========================
  // Hybrid Login
  // Authenticator + OTP Fallback
  // =========================
  async loginSmartHybrid({maxOtpAttempts = 3,authTimeout = 60000} = {})
  {
    console.log(' Starting Salesforce Login (Hybrid Mode)...');
    await this.enterCredentials();
    console.log(' Waiting for Authenticator approval OR OTP screen...'); 

    const result = await Promise.race 
    ([ 
      // Authenticator success (detect via URL change) 
      this.page.waitForURL(this.homeUrlPattern, { timeout: authTimeout }).then(() => 'auth_success').catch(() => null), 
      // OTP screen visible directly
      this.otpLocator.waitFor({state: 'visible',timeout: authTimeout}).then(() => 'otp_visible').catch(() => null)
    ]);

  
    // CASE 1 → AUTH SUCCESS
    if (result === 'auth_success')
    {
      console.log(` Login successful via Authenticator: ${this.page.url()}`);
      return;
    }

    // CASE 2 → OTP SCREEN VISIBLE
    if (result === 'otp_visible')
    {
      console.log(' OTP screen detected directly');
      await this.performOtpFlow(maxOtpAttempts);
      return;
    }
  
    // CASE 3 → AUTH TIMEOUT
    console.log(' Authenticator timeout → switching to OTP flow');
    //await this.clickHavingTrouble(); // Click "Having Trouble?" and wait for options to load

    //await this.clickDifferentVerificationMethod();

    // Start OTP Flow
    await this.performOtpFlow(maxOtpAttempts);
  }
}