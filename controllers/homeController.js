const Home = require('../models/homeModel');

// Display list of all Artists.
exports.index = function (req, res, next)
{
  res.render('index', {
    header: 'Local',
    title: 'Local',
  });
};