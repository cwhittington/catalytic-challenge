'use strict';

const sendEmail = require('..').sendEmail;
const cancelTemplate = require('../assets/templates/canceled');

const chai = require('chai');
const expect = chai.expect;

describe('canceled', () => {
    function sendCancelEmail (callback) {
        return sendEmail({
            html: cancelTemplate()
        }, callback);
    }

    it('should send out canceled email', done => {
        sendCancelEmail((err, result) => {
            if (err) {
                return done(err);
            }

            expect(result).to.be.ok;
            expect(result.email).to.be.ok;
            expect(result.info).to.be.ok;

            done();
        });
    });

    // TODO: when step 2 is complete this test should pass
    it.skip('should generate text alternative', done => {
        sendCancelEmail((err, result) => {
            if (err) {
                return done(err);
            }

            const text = result.email.text;
            expect(text).to.be.ok;

            // don't worry about how text is wrapped
            expect(text.replace(/\n/g, ' ')).to.include('Your task was canceled! Bummer.');

            done();
        });
    });
});
