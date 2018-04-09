# Notes

## Unrecognized Requests

I noticed that the test cases are all positive, so I decided to add some negative test cases.  This involved adding a new template for unrecognized requests, which is returned under either of the following:

    * There is no provided message body
    * There is a provided message body, but it is not recognized or otherwise invalid.

I wanted to provide a mechanism to gracefully handle inbound requests that are not well understood.  Future enhancements would include:

    * Eliminating the need for specific text lookup to determine response, via regex or some other mechanism (subject line recognition or the like)
    * Breaking up the email inboxes on a per request basis.