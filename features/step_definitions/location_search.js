var assert = require('assert');

module.exports = function () {
  this.Given(/^I visit Test Cookbook website$/, function() {
    return this.driver.get('http://www.testcookbook.com');
  });

  this.Then(/^I see title Test Cookbook$/, function() {
    this.driver.getTitle().then(function (title) {
      assert.equal(title, "Test Cookbook");
      return title;
    });
  });
};