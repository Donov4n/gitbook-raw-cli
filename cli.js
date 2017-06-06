#! /usr/bin/env node

'use strict';

const gitbook = require('gitbook');
const _       = require('lodash');
const argv    = require('minimist')(process.argv.slice(2));

const command = argv._[0];
const cmd     = _.find(gitbook.commands, _cmd => (
    _cmd.name.split(' ')[0] === command
));

if (!cmd) {
    throw new Error(`Command ${command} doesn't exist.`);
}

const kwargs = _.omit(argv, '$0', '_');
_.each(cmd.options || [], (option) => {
    if (kwargs[option.name] === undefined) {
        kwargs[option.name] = option.defaults;
    }

    if (option.values && !_.includes(option.values, kwargs[option.name])) {
        throw new Error(`Invalid value for option "${option.name}"`);
    }
});

cmd.exec(argv._.slice(1), kwargs);
