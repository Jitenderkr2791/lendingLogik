// contactVerification.js

const ContactVerificationLocators = {
  Logo: "(//img[@alt='Lending Logik Logo'])[3]",
  EmailVerificationMessage: "text=verification code has been sent to your email address",
  EmailVerificationStrong: "strong",
  Emailverificationcodeinputfield: "//input[@placeholder='Enter the code received via email']",
  MobileNumberverificationcodeinputfield: "//input[@placeholder='Enter the code received via SMS']",
  Passwordinputfield: "//input[@placeholder='Create a password']",
  ConfirmPasswordInputField: "//input[@placeholder='Confirm your password']",
  Backbutton: "//button[text()='Back']",
  Verifyandcontinuebutton: "//button[text()='Verify and Continue']"
};

export default ContactVerificationLocators;
