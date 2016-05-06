console.log('starting password manager');

var crypto = require('crypto-js');

var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
    .command('create', 'Create a new account', function(yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Account name (eg: Twitter, Facebook)',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'Account username or email',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'Account password',
                type: 'string'
            },
            masterpassword: {
                demand: true,
                alias: 'm',
                description: 'Master password',
                type: 'string'
            }
        }).help('help');
    })
    .command('get', 'Create a new field', function(yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Account name (eg: Twitter, Facebook)',
                type: 'string'
            },
            masterpassword: {
                demand: true,
                alias: 'm',
                description: 'Master password',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;
var command = argv._[0];

function getAccounts(masterpassword) {
    var encryptedAccount = storage.getItemSync('accounts');
    var accounts = [];

    if (typeof encryptedAccount !== 'undefined') {
        var bytes = crypto.AES.decrypt(encryptedAccount, masterpassword);
        var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }

    return accounts;
}

function saveAccounts(accounts, masterpassword) {

    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterpassword);

    storage.setItemSync('accounts', encryptedAccounts.toString());

    return accounts;
}

function createAccount(account, masterpassword) {
    var accounts = getAccounts(masterpassword);
    accounts.push(account);
    saveAccounts(accounts, masterpassword);
    return account;
}

function getAccount(accountName, masterpassword) {
    var accounts = getAccounts(masterpassword);
    var matchedAccount;

    accounts.forEach(function(account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });

    return matchedAccount;
}

if (command === 'create') {
    try {
        var createdAccount = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password
        }, argv.masterpassword);
        console.log('Account created!');
        console.log(createdAccount);
    } catch (e) {
        console.log("Unable to create account!");
    }
} else if (command === 'get') {
    try {
        var fetchedAccount = getAccount(argv.name, argv.masterpassword);
        if (typeof fetchedAccount === 'undefined') {
            console.log('Account not found');
        } else {
            console.log("Account found!");
            console.log(fetchedAccount);
        }
    } catch (e) {
        console.log("Unable to fetch account");
    }
}
