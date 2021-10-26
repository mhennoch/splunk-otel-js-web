const {join} = require('path');
const build = `Nightwatch Desktop Web build-${ new Date().getTime() }`;

// More information about the configuration file can be found here
// https://nightwatchjs.org/gettingstarted/configuration/
module.exports = {
	src_folders: [
		join(process.cwd(), 'integration-tests/tests/visibility'),
		join(process.cwd(), 'integration-tests/tests/cookies'),
		join(process.cwd(), 'integration-tests/tests/context'),
	],
    // src_folders: ['integration-tests/tests'],
    // page_objects_path: [join(process.cwd(), 'tests/page-objects/')],
    // See `/tests/custom-commands/customSauceLabsEnd.js` for the logic
    globals_path: join(__dirname, 'globals.js'),
    custom_commands_path: 'integration-tests/utils/custom-commands/',
    filter: '**/*.spec.js',

    test_workers: {
        enabled: true,
        workers: 'auto',
    },

    test_settings: {
        // Our Sauce Labs object
        sauceLabs: {
            selenium_host: `ondemand.${process.env.REGION === 'eu' ? 'eu-central-1' : 'us-west-1'}.saucelabs.com`,
            selenium_port: 80,
            username: process.env.SAUCE_USERNAME,
            access_key: process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: {
                acceptSslCerts: true,
                acceptInsecureCerts: false,
                build,
                tunnelIdentifier: process.env.SAUCE_TUNNEL_ID,
                screenResolution: '1600x1200',
                seleniumVersion: '3.141.59',
            },
            globals: {
                enableHttps: true
            }
        },
        localChrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                alwaysMatch: {
                    'goog:chromeOptions': {
                        args: [
                            '--no-sandbox',
                            '--disable-infobars',
                            '--headless',
                        ],
                    },
                },
            },

            webdriver: {
                start_process: true,
                port: 9515,
                server_path: require('chromedriver').path,
            },
        },

        // Sauce Labs capabilities
        chrome: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'chrome',
                platform: 'Windows 10',
                version: 'latest',
            },
        },
        firefox: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'firefox',
                platform: 'Windows 10',
                version: 'latest',
            },
        },
        ie11: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'internet explorer',
                browserVersion: '11',
                platformName: 'Windows 10',
            },
        },
        edge: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'MicrosoftEdge',
                platform: 'Windows 10',
                version: 'latest',
            },
        },
        safari: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'safari',
                browserVersion: '13',
                'sauce:options': {
                }
            },
        },
    },
};
