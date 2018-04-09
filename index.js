'use strict';

const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const cancelTemplate = require('./assets/templates/canceled');

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
    console.log(JSON.stringify(email));
    
    if(!email.hasOwnProperty('text') || !email.text) {
        callback(new Error('No body provided, unable to initiate response'));
    }

    if(!email.text.includes('cancel')) {
        callback(new Error('Unable to process email, as it does not contain cancel verbiage'));
    }

    sendEmail({
        html: cancelTemplate()
    }, callback);
}

module.exports = {
    sendEmail,
    respondToEmail
};
