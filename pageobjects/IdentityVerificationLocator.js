

const IdentityVerificationLocators = {
  PrimaryProofofIdentityLable: "//label[normalize-space()='Primary Proof of Identity']",
  
  IdentityDropdown: "//select[@data-field='firstIdentity']",

  MedicareCardnumberlocator: "//input[@placeholder='Medicare card number']",

  DrivingLicensenumber: "//input[@placeholder='Reference number on card']",

  MedicareCardExpiryDate: "//input[@placeholder='Expiry date on card']",

  PassportDropDownOption: "//select[@data-field='firstIdentity']/option[@value='Passport']",

  SecondaryProofofIdentity: "//select[@data-field='secondIdentity']",

  DrivingLicenseDropDownOptionSecond: "//select[@data-field='secondIdentity']/option[@value='Driving License']",

  PassportNumberInput: "//input[@placeholder='Enter your Passport Number']",

  PassportExpiryDate :  "//input[@placeholder='Enter your Passport Expiry Date']",

  BackButtonIdentity : "//button[normalize-space()='Back']",

  ContinueButtonIdentity : "//button[@data-stage='identity'][normalize-space()='Continue']"


};

export default IdentityVerificationLocators;
