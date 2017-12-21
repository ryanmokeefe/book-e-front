# Book-E Front-End

This repo contains a client-side jQuery-based application that will connect to your [local API we've built during class](https://git.generalassemb.ly/ga-wdi-exercises/book-e-backend). If you haven't kept up in-class with building the Express API, don't worry-- see the setup instructions below.

## Set up

1. Clone down this repository and open `index.html` in your browser.
2. In the directory for `book-e-backend`, check out the `solution` branch and run `nodemon`.
3. Make sure you have `mongod` running, and run `node db/seed.js` in `book-e-backend` to reset & seed your database.

## Instructions

You will be writing code that uses `$.ajax()` to AJAX requests to the Express-based `book-e-backend` API in three functions: `handlePost`, `handleDelete`, and `handlePut`. There are comments in `script.js` instructing where to write your AJAX code, as well as some critical hints to help you get started. Part of the code for your `POST` request code is already present.

## AJAX

Take [a look at our AJAX lesson](https://git.generalassemb.ly/ga-wdi-lessons/js-ajax#ajax-and-crud-60-minutes-225) for a refresher on `$.ajax()`; it takes an object as an argument with very specific keys and values.
