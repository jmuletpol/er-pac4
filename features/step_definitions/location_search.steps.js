const assert = require('assert');
const {Given, Then, When, Before, After} = require('@cucumber/cucumber');
const { Builder, By } = require("selenium-webdriver")

let driver;

Before(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().setTimeouts( { implicit: 10000 } );
})

After(async() => {
  if(driver!=null) {
   await driver.quit();
  }
})
 
Given('Suposant que l\'usuari visita {string} a {string}', async function(title, url) {
    await driver.get(url);
    const currentTitle = await driver.getTitle();
    assert(currentTitle.indexOf(title)>=0);
}); 
 
Given('que no ha iniciat sessió amb cap usuari', async() => {
    const hasLoginBtn = await driver.findElement(By.className("wz-header__login-button")).isDisplayed();
    assert(hasLoginBtn);
});

Given('el mapa està centrat en la regió Espanya', async() => {
  await driver.get("https://www.waze.com/ca/live-map/directions?latlng=39.44871624877421%2C-5.799222886562347");
  // Aquest enllaç situa el mapa en regió Espanya
  const inputDesti = await driver.findElement(By.css('div.is-origin input.wm-search__input'));
  // però té el problema que estableix un destí... cal esperar que aparegui un missatge i esborrar el destí.
  await driver.sleep(2000);
  await inputDesti.clear();
});

When('introdueix el text {string} al camp ubicació d\'origen', async (valor) => {
  const inputSortida = await driver.findElement(By.css('div.is-origin input.wm-search__input'));
  await inputSortida.clear();
  await inputSortida.sendKeys(valor);
});

Then('es desplega un llista d\'opcions que conté {string}', async(resultat) => {
  await driver.sleep(1000);
  const searchSuggestions = await driver.findElement(By.id("search-suggestions"));
  const allResults = await searchSuggestions.findElements(By.css("li.wm-search-item"));
  //console.log("Results found ", allResults.length)
  let found = false;
  let i = 0;
  const len = allResults.length;
  while(i<len && !found) { 
    // No ha funcionat el mètode getAttribute("data-value") per parsejar tota la informació de l'opció
    const value = await allResults[i].getText();
    found = value === resultat;
    i++;
  }
  assert(found);
});

  