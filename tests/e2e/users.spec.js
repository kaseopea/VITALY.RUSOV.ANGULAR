// Users Managment Specs
// =====================================================================================================================
//- check user creating by admin
//- check user info update by admin
//- check loaded info about each user after login
//- check user info update by himself
//- check user info validate by admin after user’s change

by.addLocator('text', function(text, selector, _parent) {
	return Array.prototype.filter.call( (_parent || document).querySelectorAll(selector), function(e){
		return e && !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) && e.textContent && e.textContent.toLowerCase().trim() === text.toLowerCase().trim();
	});
});

var EC = protractor.ExpectedConditions;
var site = 'http://localhost:9000/';
var admin = {
	login: 'olga@mail.ru',
	password: '123'
};
var user = {
	login: 'peter@mail.ru',
	password: '123'
};

var newUser = {
	login: 'new_user@mail.ru',
	password: '123'
}

describe('Create New User by Admin', function () {
	beforeEach(function () {
		browser.ignoreSynchronization = false;
		browser.get(site + '#/');
		var login = element(by.model('vm.user.email'));
		var password = element(by.model('vm.user.password'));
		var submit = element(by.css('button[type="submit"]'));
		login.clear();
		login.sendKeys(admin.login);
		password.clear();
		password.sendKeys(admin.password);
		submit.click();
		browser.wait(function () {
			return browser.getCurrentUrl().then(function(url) {
				return url === (site+'#/profile/view');
			});
		});
	});

	afterEach(function () {
		element(by.linkUiSref('logout')).click();
		browser.wait(function () {
			return browser.getCurrentUrl().then(function(url) {
				return url === (site+'#/');
			});
		});
		browser.wait(element(by.css('[name="loginForm"]')).isPresent());
		expect(element(by.css('[name="loginForm"]')).isPresent()).toBe(true);
	});

	// it('create user', function (done) {
	// 	browser.get(site + '#/users-list');
	// 	//modal
	// 	element(by.className('create-user')).click();
	// 	var dialog = $('md-dialog-content');
	//
	// 	browser.wait(EC.presenceOf(dialog));
	//
	// 	expect(element(by.className('createUserForm')).isPresent()).toBe(true);
	//
	// 	//form data
	// 	var login = element(by.model('vm.user.email'));
	// 	var password = element(by.model('vm.user.password'));
	// 	var submit = element(by.css('.createUserForm button[type="submit"]'));
	//
	// 	login.clear();
	// 	login.sendKeys(newUser.login);
	// 	password.clear();
	// 	password.sendKeys(newUser.password);
	// 	submit.click();
	//
	// 	// expect(element(by.text(newUser.login, 'div')).isPresent()).toBe(true);
	// 	done();
	// });


});