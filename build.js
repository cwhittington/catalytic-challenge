#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');
const pug = require('pug');
const glob = require('glob');
const sass = require('node-sass');
const mkdirp = require('mkdirp');
const VError = require('verror');

// Compile SCSS into CSS.
function buildCss (callback) {
    // make it easy for Pug templates to reference CSS
    const cssDir = path.resolve(__dirname, 'assets');

    const outputFile = path.resolve(cssDir, 'email.css');
    const sassOptions = {
        file: path.resolve(__dirname, 'email.scss'),
        outputStyle: 'compressed'
    };

    async.auto({
        mkdir (callback) {
            mkdirp(cssDir, callback);
        },

        css (callback) {
            sass.render(sassOptions, function (err, result) {
                if (err) {
                    return callback(new VError(err, `Error compiling SCSS at ${err.file}:${err.line}:${err.column}`));
                }

                callback(null, result.css);
            });
        },

        write: ['mkdir', 'css', function (results, callback) {
            fs.writeFile(outputFile, results.css, callback);
        }]
    }, callback);
}

// Compile Pug templates
function compileTemplates (callback) {

    // Calculate output filename from Pug template name.
    // Outputs file names with .js extension in assets/templates directory.
    // For example, templates/canceled.pug -> assets/templates/canceled.js
    function getOutputFilename (filename) {
        const templatePath = path.relative(path.resolve(__dirname, 'templates'), filename);
        const outFilename = path.resolve(__dirname, 'assets/templates', templatePath);
        return outFilename.slice(0, -4) + '.js'; // replace .pug extension
    }

    // Compile Pug template into a string of Javascript
    function compileTemplate (file, filename, callback) {
        try {
            const template = pug.compileClient(file, {
                filename,
                doctype: 'html',
                pretty: false,
                compileDebug: process.env.NODE_ENV === 'test'
            });
            return callback(null, '/* eslint-disable */\n' + template + ';module.exports = template;');
        } catch (e) {
            return callback(e);
        }
    }

    const templatesDir = path.resolve(__dirname, 'templates/*.pug');
    glob(templatesDir, function (err, filenames) {
        if (err) {
            return callback(err);
        }

        if (!filenames.length) {
            // Fail build if we can't find any templates.
            // That probably means we didn't look in the right place!
            return callback(new Error('No templates found'));
        }

        async.each(filenames, function (filename, callback) {
            const outputFilename = getOutputFilename(filename);

            async.auto({
                // create output directory if needed
                mkdir: function (callback) {
                    mkdirp(path.dirname(outputFilename), callback);
                },

                file: function (callback) {
                    // TODO Step 1: read the file located at `filename` from the filesystem
                    // This can be done in one line of code, but feel free to write more if you feel it's necessary
                },

                template: ['file', function (results, callback) {
                    const file = results.file;

                    // TODO Step 1: call compileTemplate to generate Javascript
                    // This can be done in one line of code, but feel free to write more if you feel it's necessary
                }],

                writeFile: ['template', 'mkdir', function (results, callback) {
                    fs.writeFile(outputFilename, results.template, callback);
                }]
            }, callback);
        }, callback);
    });
}

function buildEmails (callback) {
    async.series(
        [
            buildCss,
            compileTemplates
        ],
        function (err, otherStuff) {
            // don't pass otherStuff
            callback(err);
        }
    );
}

if (!module.parent) {
    buildEmails(function (err) {
        if (err) {
            throw err;
        }
    });
}
module.exports = buildEmails;
module.exports.buildCss = buildCss;
module.exports.compileTemplates = compileTemplates;
