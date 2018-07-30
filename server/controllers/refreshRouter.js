//redirect all refreshes, which come in the form of "get" requests back to our root page

const express = require('express');

var refreshRouter = express.Router();

refreshRouter.get('/login', (req, res) => {
  res.redirect('/');
});
refreshRouter.get('/profile', (req, res) => {
  res.redirect('/');
});
refreshRouter.get('/signup', (req, res) => {
  res.redirect('/');
});
refreshRouter.get('/global', (req, res) => {
  res.redirect('/');
});

module.exports = refreshRouter;
