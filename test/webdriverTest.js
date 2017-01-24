
// "use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();


function logTitle() {
	browser.getTitle().then(function(title) {
		console.log('Current Page Title: ' + title);
	});
}
function clickLink(link) {
	link.click();
}

function handleFailure(err) {
	console.error('Something went wrong\n', err.stack, '\n');
	closeBrowser();
}
function closeBrowser() {
	browser.quit();
}

browser.navigate().to("http://blackjackwebtest.herokuapp.com");
// browser.get('http://blackjackwebtest.herokuapp.com/');
browser.findElement(webdriver.By.id('loginLink')).click();
browser.findElement(webdriver.By.name('username')).sendKeys('jwb94');
browser.findElement(webdriver.By.id('password')).sendKeys('password');
browser.findElement(webdriver.By.name('button')).click();

