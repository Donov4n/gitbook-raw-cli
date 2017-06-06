#! /usr/bin/env node

'use strict';

const gitbook = require('gitbook');
const omit    = require('lodash.omit');
const argv    = require('minimist')(process.argv.slice(2));

const command = argv._[0];
const cmd     = gitbook.commands.find(_cmd => (
    _cmd.name.split(' ')[0] === command
));

if (!cmd) {
    throw new Error(`Command "${command}" doesn't exist.`);
}

const kwargs = omit(argv, '$0', '_');
if (cmd.options) {
    cmd.options.forEach((option) => {
        if (kwargs[option.name] === undefined) {
            kwargs[option.name] = option.defaults;
        }

        if (option.values && option.values.indexOf(kwargs[option.name]) === -1) {
            throw new Error(`Invalid value for option "${option.name}"`);
        }
    });
}

cmd.exec(argv._.slice(1), kwargs);
