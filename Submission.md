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


