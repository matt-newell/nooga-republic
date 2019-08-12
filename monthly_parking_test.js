Feature("Monthly Parking");
Scenario("Republic Parking Payment", I => {
  I.say("Login / Pay for Monthly Parking");
  I.amOnPage(
    "https://monthly.republicparking.com/ParisWeb-SignIn.aspx?ReturnUrl=%2fmain%2fParisWeb-Main.aspx"
  );
  I.see("Monthly Parking Center Sign-In");
  I.fillField("#txtEmailAddress", process.env.USER_NAME);
  I.fillField("#txtUserPassword", process.env.PASSWORD);
  I.pressKey("Enter");

  I.say("Verify Login Successful");
  I.see(process.env.USER_NAME, "#ContentPlaceHolder1_lblAccountID");
  I.see(process.env.FULL_NAME, "#ContentPlaceHolder1_AcctName");

  I.say("Go To Payment");
  I.click("#hlPayment");
  I.see("Information (all fields are required)", "b");

  I.say("Verify Information");

  I.say("Enter Payment Info");
  I.fillField("#ContentPlaceHolder1_txtAmount", 80);
  I.selectOption("#ContentPlaceHolder1_ddlCCType", "Visa");
  I.fillField("#ContentPlaceHolder1_CCNumber", process.env.CREDIT_CARD_NUMBER);
  I.fillField("#ContentPlaceHolder1_txtCVV", process.env.CREDIT_CARD_CSV);
  I.selectOption(
    "#ContentPlaceHolder1_ddlCCMonth",
    process.env.CREDIT_CARD_MONTH
  );
  I.fillField("#ContentPlaceHolder1_txtExpYear", process.env.CREDIT_CARD_YEAR);

  I.say("Agree Terms / Submit");
  I.click("agree");

  I.say("Save Reciept");

  const paymentDate = new Date();
  const receipt = ['parking_receipt~', paymentDate.getMonth(), '-', paymentDate.getDay(), '-', paymentDate.getFullYear(), '.png'];

  I.saveScreenshot(receipt.join(''), "parking");
});
