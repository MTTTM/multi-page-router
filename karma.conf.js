// Karma configuration
// Generated on Sun Jan 08 2017 16:10:08 GMT+0800 (CST)


var path = require("path");
var srcDir = path.resolve(process.cwd(), 'src');
const nodeModPath = path.resolve(process.cwd(), './node_modules');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const chai = require("chai");
const commonjs = require('rollup-plugin-commonjs');
const istanbul = require('rollup-plugin-istanbul');
const es3ify=require('rollup-plugin-es3ify');//解决IE8中编译后 export，try catch 里面包含的IE8浏览器关键字导致的，“无法识别标识”错误
const multiEntry =require('rollup-plugin-multi-entry');


const input = { input: ['test/unit/**/*.spec.js','src/*.js'] };
const output = {
  // file: 'dist/index.js',
  format: 'umd',
  name: '$Router', //把router挂在window.Router下面
};

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test/unit/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
      'src/js/lib'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/unit/**/*.spec.js': ['rollup']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9872,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 20,
    rollupPreprocessor: {
      ...input,
      output,
      plugins: [
        es3ify(),
        resolve({
          module: true
        }),
        commonjs(),
        istanbul({
          exclude: ['node_modules/**/*']
        }),
        babel({
          exclude: 'node_modules/**' // only transpile our source code
        }),
        multiEntry()
      ]
    }
    // ,
    // coverageIstanbulReporter: {
    //   reports: ['text-summary', 'html'],
    //   fixWebpackSourcePaths: true
    // }
  })
}