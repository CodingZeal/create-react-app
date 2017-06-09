'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');

const paths = require('../config/paths');

const argv = process.argv.slice(2);
const eslint = path.resolve(paths.ownNodeModules, '.bin/eslint');

const proc = spawn.sync(eslint, [paths.appSrc, ...argv], { stdio: 'inherit' });
process.exit(proc.status);
