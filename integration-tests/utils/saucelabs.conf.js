const {join} = require('path');
const build = `Nightwatch Desktop Web build-${process.env.DATE}`;

// More information about the configuration file can be found here
// https://nightwatchjs.org/gettingstarted/configuration/
module.exports = {
    src_folders: [join(process.cwd(), 'integration-tests/tests/docload')],
    // src_folders: ['integration-tests/tests'],
    // page_objects_path: [join(process.cwd(), 'tests/page-objects/')],
    // See `/tests/custom-commands/customSauceLabsEnd.js` for the logic
    globals_path: join(__dirname, 'globals.js'),
    // custom_commands_path: 'tests/custom-commands/',
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
                build,
                tunnelIdentifier: 'mhennoch-temp-github-action-tunnel',
                screenResolution: '1600x1200',
                seleniumVersion: '3.141.59',
            },
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
        sauceChrome: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'googlechrome',
                platform: 'Windows 10',
                version: 'latest',
            },
        },
        sauceFirefox: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'firefox',
                platform: 'Windows 10',
                version: 'latest',
            },
        },
        sauceIE: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'internet explorer',
                platform: 'Windows 10',
                version: 'latest',
            },
        },
        sauceEdge: {
            extends: 'sauceLabs',
            desiredCapabilities: {
                browserName: 'MicrosoftEdge',
                platform: 'Windows 10',
                version: 'latest',
            },
        },
    },
};
