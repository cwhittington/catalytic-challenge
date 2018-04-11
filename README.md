# Catalytic Coding Challenge (Convo UI)

Welcome to Catalytic's Conversational Coding Challenge!

## Setup

Clone the project and run `npm install` to get started. Run `npm run build` to build the email templates
and `npm run server` to start a local SMTP server. Emails sent to this local SMTP server are visible at
http://127.0.0.1:1080.

## The Project

### 1. Finish the build script

`npm run build` should compile the Pug templates located in the `templates` directory and output the resulting
Javascript to the `assets/templates` directory. Finishing it is left for you. See `build.js` for more info.

When complete, `npm test` should succeed.

### 2. Add plaintext

It's good practice to include plaintext versions of your HTML emails. While you can do this manually,
it would be nice if we could generate plaintext from the HTML automatically.

You're encouraged *not* to implement your own HTML-to-plaintext algorithm. Instead, use an existing npm module.
After all, leveraging existing solutions is a big part of building software.

When complete, the skipped test in `test/test_canceled.js` should succeed.

### 3. Improve the email

We have a simple email (`canceled.pug`) that's sent to users when a task is canceled. Try to improve this
email: make it pretty, add more content, or whatever you feel is warranted.

This is your chance to show off some of your front-end skills. There's no right answer, so feel free to be
creative.

**Reminder**: run `npm run build` after modifying the email template to compile your new version.
If you have your local SMTP server running, you can see your emails at http://127.0.0.1:1080.

### 4. Make it conversational

So far, the existing code isn't very "conversational." It sends emails out, but it doesn't respond to emails.
Implement the `respondToEmail` function in `index.js` to do just that.

When complete, the tests in `test/test_respond.js` should succeed.

### 5. (optional) Improve the code

We try to foster an engineering culture where anyone can suggest improvements to any part of the code.
Along those lines, if you have any ways to make this project better, feel free to implement them.
Maybe you found a bug we missed, an algorithmic improvement, or a better design for the emails.
Or maybe you want to port the templates to some awesome new template language. Go crazy!

You may not have any ways to improve the code. That's OK! This section is optional for a reason.

Whatever you do, try to justify your changes (in comments or commits). You may even want to document
changes you considered but ultimately decided against.

