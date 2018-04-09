'use strict';

const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const cancelTemplate = require('./assets/templates/canceled');
const unknownTemplate = require('./assets/templates/unknown');

const localTransport = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 1025,
    ignoreTLS: true
});

function sendEmail (options, callback) {
    const email = Object.assign({
        from: 'test@localhost',
        to: 'test@localhost',
    }, options);

    // TODO Step 2: Generate plaintext alternative from HTML
    // This should take no more than a few lines
    if(email.hasOwnProperty('html') && email.html) {        
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

function respondToEmail (email, callback) {
    if(!email.hasOwnProperty('text') || !email.text) {
        console.error('No body found, responding with unknonwn');
        sendUnknownRequestEmail(callback);
        return;
    }

    if(!email.text.includes('cancel')) {
        console.error('Unable to process email, as it does not contain cancel verbiage');
        sendUnknownRequestEmail(callback);
        return;
    }

    sendEmail({
        html: cancelTemplate()
    }, callback);
}

function sendUnknownRequestEmail(callback) {
    sendEmail({
        html: unknownTemplate(),
        subject: 'Unknown Request'
    }, callback);
}

module.exports = {
    sendEmail,
    respondToEmail
};
