'use strict';

const respondToEmail = require('..').respondToEmail;

const chai = require('chai');
const expect = chai.expect;

describe.skip('#respondToEmail', () => {
    it('should respond to `cancel` with canceled email', done => {
        respondToEmail({
            from: 'test@localhost',
            text: 'Hey Pushbot, can you cancel my task? Thanks'
        }, function (err, response) {
            if (err) {
                return done(err);
            }

            const html = response.email.html.replace(/\n/g, ' ');
            expect(html).to.include('Your task was canceled! Bummer.');

            done();
        });
    });
});
