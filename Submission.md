# Notes

## Unrecognized Requests

I added a new email template for unrecognized requests, as well as scenarios for using it.

## Testing

I noticed that the test cases are all positive, so I decided to add some negative test cases.  

* There is no provided message body
* There is a provided message body, but it is not recognized or otherwise invalid.

I also added some extra validation in the tests to further validate email addresses and the like.

## Abstraction

While the app is fairly simple, I still tried to do a little cleanup.  I changed several pieces:

* Removed the hard-coded to/from values, leaving it up to the client (tests) to specify these values.
* Added config to store the mail server values.  This way, we can define environment-specific values.
* Removed the dependency on the cancelTemplate and pushed that into the tests.  This way the funcitons in index.js can be used a little more generically.

## Other enhancements

I considered other enhancements to the application, but ulitmately decided against them:

* I thought about moving the respond/send functions into separate handlers, but I didn't want to increase the complexity of the application too much for the purposes of this exercise.
* The tests have a depenedency on a running mail server.  It may be nice to mock out the mail server for the purposes of the tests using sinon or similar mocking framework to remove this.
* The functions can generally be invoked by anyone, it may be nice to include some sort of validation that the caller is allowed to send/respond to email.

## CSS

I'll be perfectly honest and say that CSS isn't something I'm very good at (or really, know at all).  I batted around a few ideas, but couldn't come up with anything clever, so it isn't all that different from the original.
