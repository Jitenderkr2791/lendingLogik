// Pageobjectpersonaldetails.js

const PersonalDetailsLocators = {
  Logo: "(//div[@class='top-bar']//img[@alt='Lending Logik Logo'])[1]",
  Selectloanamount: "(//select[@data-field='amount'])[2]",
  Selectloanpurpose: "(//select[@data-field='loanPurpose'])[2]",
  Firstname: "(//input[@data-field='firstName'])[2]",
  Lastname: "(//input[@data-field='lastName'])[2]",
  Birthdate: "(//input[@placeholder='Date of birth'])[2]",
  Mobilenumber: "(//input[@placeholder='Mobile number'])[2]",
  Emailaddress: "(//input[@placeholder='Email address'])[2]",
  Streetaddress: "(//input[@placeholder='Street address'])[2]",
  City: "(//input[@placeholder='City'])[2]",
  Postalcode: "(//input[@placeholder='Postal code'])[2]",
  State: "(//input[@placeholder='State'])[2]",
  Country: "(//input[@placeholder='Country'])[2]",
  Continuebutton: "(//button[text()='Continue'])[2]"
};

export default PersonalDetailsLocators;
