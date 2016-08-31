exports.config = {
	framework: "jasmine2",
	allScriptsTimeout: 30000,
	// includeStackTrace: true,
	getPageTimeout: 30000,
	jasmineNodeOpts: {defaultTimeoutInterval: 120000},

	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': ['--window-size=1690,1000']
		}
	},

	// directConnect: true,

	onPrepare: function () {
		var jasmineReporters = require('jasmine-reporters');
		browser.manage().window().setSize(1600, 1000);
		
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			filePrefix: 'xmloutput',
			savePath: 'dist/e2e'
		}));

		require('protractor-linkuisref-locator')(protractor);
	}
};