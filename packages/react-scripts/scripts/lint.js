'use strict';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

var path = require('path');
var spawn = require('cross-spawn');

var paths = require('../config/paths');

var argv = process.argv.slice(2);
var eslint = path.resolve(paths.ownNodeModules, '.bin/eslint');

var proc = spawn.sync(eslint, [paths.appSrc, ...argv], {stdio: 'inherit'});
process.exit(proc.status);
