/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

// Note: this file does not exist after ejecting.

const fs = require('fs');
const paths = require('../config/paths');

module.exports = (resolve, rootDir, isEjecting) => {
  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsFile = fs.existsSync(paths.testsSetup) ? '<rootDir>/src/setupTests.js' : undefined;

  // TODO: I don't know if it's safe or not to just use / as path separator
  // in Jest configs. We need help from somebody with Windows to determine this.
  const config = {
    // ZEAL: Coverage report to inlcude all client src code
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    // ZEAL: Configure resolving imports from client root
    moduleDirectories: [paths.appSrc, paths.appNodeModules, paths.ownNodeModules],
    setupFiles: [resolve('config/polyfills.js')],
    setupTestFrameworkScriptFile: setupTestsFile,
    testPathIgnorePatterns: [
      '<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]'
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx)$': isEjecting ?
        '<rootDir>/node_modules/babel-jest'
        : resolve('config/jest/babelTransform.js'),
      // ZEAL: Replace this cssTransform with a moduleNameMapper below
      // '^.+\\.css$': resolve('config/jest/cssTransform.js'),
      // ZEAL: Don't use this transform for scss files
      '^(?!.*\\.(js|jsx|css|sccs|json)$)': resolve('config/jest/fileTransform.js'),
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
    ],
    moduleNameMapper: {
      '^react-native$': 'react-native-web',
      '^.+\\.(css|scss)$': resolve('config/jest/cssObjectProxy.js')
    }
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  return config;
};
