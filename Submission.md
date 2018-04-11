# Notes

## Unrecognized Requests

I noticed that the test cases are all positive, so I decided to add some negative test cases.  This involved adding a new template for unrecognized requests, which is returned under either of the following:

* There is no provided message body
* There is a provided message body, but it is not recognized or otherwise invalid.

## Abstraction

While the app is fairly simple, I still tried to move hard-coded values out of the app.  I changed several pieces:

* Removed the hard-coded to/from values, leavint it up to the client (tests) to specify these values.
* Added config to stored the mail server values.  This way, we can define environment-specific values.
* Removed the dependency on the cancelTemplate and pushed that into the tests.  This way the funcitons in index.js can be used a little more generically.

## Other enhancements

I considered other enhancements to the application, but ulitmately decided against them:

* I thought about moving the respond/send functions into separate handlers, but I didn't want to increase the complexity of the application too much for the purposes of this exercise.
* The tests have a depenedency on a running mail server.  It may be nice to mock out the mail server for the purposes of the tests using sinon or similar mocking framework.
* The functions can generally be invoked by anyone, it may be nice to include some sort of validation that the caller is allowed to send/respond to email.
