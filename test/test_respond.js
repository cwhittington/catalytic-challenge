'use strict';

const respondToEmail = require('..').respondToEmail;
const cancelTemplate = require('../assets/templates/canceled');

const chai = require('chai');
const expect = chai.expect;

describe('#respondToEmail', () => {
    it('should respond to `cancel` with canceled email', done => {
        respondToEmail({
            from: 'test_user@localhost',
            to: 'test@localhost',
            text: 'Hey Pushbot, can you cancel my task? Thanks'
        }, cancelTemplate(), function (err, response) {
            if (err) {
                return done(err);
            }

            const html = response.email.html.replace(/\n/g, ' ');
            expect(html).to.include('Your task was canceled! Bummer.');
            expect(response.email.subject).to.equal('Task Canceled');
            expect(response.email.from).to.equal('test@localhost');
            expect(response.email.to).to.equal('test_user@localhost');

            done();
        });
    });

    it('should repspond with unknown email if text not provided', done => {
        respondToEmail({
            from: 'test_user@localhost',
            to: 'test@localhost',
        }, cancelTemplate(), function (err, response) {
            if (err) {
                return done(err);
            }

            const html = response.email.html.replace(/\n/g, ' ');
            expect(html).to.include('Unrecognized request, please retry.');
            expect(response.email.subject).to.equal('Unrecognized Request');
            expect(response.email.from).to.equal('test@localhost');
            expect(response.email.to).to.equal('test_user@localhost');
            done();
        });
    });

    it('should repspond with unknown email if text provided is not understood', done => {
        respondToEmail({
            from: 'test_user@localhost',
            to: 'test@localhost',
            text: 'Careful man, there\'s a beverage here'
        }, cancelTemplate(), function (err, response) {
            if (err) {
                return done(err);
            }

            const html = response.email.html.replace(/\n/g, ' ');
            expect(html).to.include('Unrecognized request, please retry.');
            expect(response.email.subject).to.equal('Unrecognized Request');
            expect(response.email.from).to.equal('test@localhost');
            expect(response.email.to).to.equal('test_user@localhost');

            done();
        });
    });
});
