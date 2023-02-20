const model = require('../models/homeModel');

exports.index = function (req, res, next)
{
  const rows = model.GetAllReferences();
  res.render('home/index', {
    header: 'Local',
    title: 'Local',
    references: rows,
  });
};