'use strict';

const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const cancelTemplate = require('./assets/templates/canceled');
const unknownTemplate = require('./assets/templates/unrecognized');

const localTransport = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 1025,
    ignoreTLS: true
});

function sendEmail (email, callback) {
    // TODO Step 2: Generate plaintext alternative from HTML
    // This should take no more than a few lines
    if(email && email.hasOwnProperty('html') && email.html) {        
        email.text = htmlToText.fromString(email.html);
    }
    else {        
        return callback(new Error('Body is empty'));
    }

    return localTransport.sendMail(email, (err, info) => {
        if (err) {
            return callback(err);
        }

        return callback(null, {
            email,
            info
        });
    });
}

function respondToEmail (email, template, callback) {
    if(!email.hasOwnProperty('text') || !email.text) {
        console.error('No body found, responding with unknonwn');
        sendUnrecognizedRequestEmail(
            { 
                to: email.from,
                from: email.to 
            }, callback);
        return;
    }

    if(!email.text.includes('Hey Pushbot, can you cancel my task? Thanks')) {
        console.error('Unable to process email, as it does not contain cancel verbiage');
        sendUnrecognizedRequestEmail(
            { 
                to: email.from,
                from: email.to
            }, callback);
        return;
    }

    sendEmail({
        to: email.from,
        from: email.to,
        html: cancelTemplate(),
        subject: 'Task Canceled'
    }, callback);
}

function sendUnrecognizedRequestEmail(options, callback) {
    sendEmail({
        to: options.to,
        from: options.from,
        html: unknownTemplate(),
        subject: 'Unrecognized Request'
    }, callback);
}

module.exports = {
    sendEmail,
    respondToEmail
};
