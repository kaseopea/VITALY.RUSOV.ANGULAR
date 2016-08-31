// auth Specs
// =====================================================================================================================
// - check incorrect login error message
// - check correct user login/logout
// - check login/logout of new one users

var EC = protractor.ExpectedConditions;
var site = 'http://localhost:9000/';

describe('AUTH Specs', function () {

	beforeEach(function () {
		browser.get(site + '#/');
	});

	it('Open site index page and check if login form present', function (done) {
		expect(browser.getCurrentUrl()).toContain(site);
		expect(element(by.css('[name="loginForm"]')).isPresent()).toBe(true);
 		done();
	});

	it('Login button should be disabled at Login page load', function (done) {
		var submit = element(by.css('button[type="submit"]'));
		expect(submit.isEnabled()).toBe(false);
		done();
	});

	it('incorrect login error message with mdToast', function (done) {
		// browser.ignoreSynchronization = true;

		var login = element(by.model('vm.user.email'));
		var password = element(by.model('vm.user.password'));
		var submit = element(by.css('button[type="submit"]'));
		login.clear();
		login.sendKeys('the_most_incredible_email@website.com');
		password.clear();
		password.sendKeys('123');
		submit.click();

		// md-toast
		var toast = element(by.css('.md-toast-text'));
		browser.wait(function () {
			return browser.isElementPresent(toast);
		});
		expect(toast.getText()).toBe('Error: User not found');
		// browser.ignoreSynchronization = false;
		done();
	});

	it('correct user login', function (done) {
		done();
	});
});

describe('Login-Logout Spec', function () {
	beforeAll(function () {
		var login = element(by.model('vm.user.email'));
		var password = element(by.model('vm.user.password'));
		var submit = element(by.css('button[type="submit"]'));
		login.clear();
		login.sendKeys('olga@mail.ru');
		password.clear();
		password.sendKeys('123');
		submit.click();
		browser.wait(function () {
			return browser.getCurrentUrl().then(function(url) {
				return url === (site+'#/profile/view');
			});
		});
	});

	it('Login success', function (done) {
		expect(browser.getCurrentUrl()).toContain(site + '#/profile/view');
		expect(element(by.css('.dashboard-content')).isPresent()).toBe(true);
		done();
	});

	//check for correct lang selector work

	it('Logout success', function (done) {
		element(by.linkUiSref('logout')).click();
		browser.wait(element(by.css('[name="loginForm"]')).isPresent());
		expect(element(by.css('[name="loginForm"]')).isPresent()).toBe(true);
		done();
	});
});