'use strict';

const respondToEmail = require('..').respondToEmail;

const chai = require('chai');
const expect = chai.expect;

describe('#respondToEmail', () => {
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

    it('should repspond with unknown email if text not provided', done => {
        respondToEmail({
            from: 'test@localhost',
        }, function (err, response) {
            if (err) {
                return done(err);
            }

            const html = response.email.html.replace(/\n/g, ' ');
            expect(html).to.include('Unrecognized request, please retry.');
            expect(response.email.subject).to.equal('Unrecognized Request');
            done();
        });
    });

    it('should repspond with unknown email if text provided is not understood', done => {
        respondToEmail({
            from: 'test@localhost',
            text: 'Careful man, there\'s a beverage'
        }, function (err, response) {
            if (err) {
                return done(err);
            }

            const html = response.email.html.replace(/\n/g, ' ');
            expect(html).to.include('Unrecognized request, please retry.');
            expect(response.email.subject).to.equal('Unrecognized Request');

            done();
        });
    });
});
