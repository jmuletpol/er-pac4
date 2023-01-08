const assert = require('assert');
const {Given, Then, When, Before, After} = require('@cucumber/cucumber');
const { Builder } = require("selenium-webdriver")

let driver;

Before(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().setTimeouts( { implicit: 10000 } );
})

After(async() => {
  if(driver!=null) {
    //await driver.quit();
  }
})

Given(/^I visit Test Cookbook website$/, async() => {
    await driver.get('http://www.testcookbook.com');
});

Then(/^I see title Test Cookbook$/, async () => {
    const title = await driver.getTitle()
    assert.equal(title, "Test Cookbook");    
});
