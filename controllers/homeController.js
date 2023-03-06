const model = require('../models/homeModel');
const { body, validationResult } = require("express-validator");

exports.index = function (req, res, next)
{
  const rows = model.GetAllReferences();
  const tags = model.GetAllUniqueTags();
  res.render('home/index', {
    header: 'Local',
    title: 'Local',
    references: rows,
    tags: tags,
  });
};

exports.edit = function (req, res, next)
{
  body('EDIT_ID', '')
    .isInt(),
  body('EDIT_NAME', '')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('EDIT_TAGS', '')
    .trim()
    .escape();

  let id = req.body.EDIT_ID;
  let newName = req.body.EDIT_NAME;
  let newTags = JSON.stringify(req.body.EDIT_TAGS.split(','));

  console.log(id);
  console.log(newName);

  model.UpdateReferenceName(id, newName);
  model.UpdateReferenceTags(id, newTags);
};

exports.updateTag = function (req, res, next)
{
  let id = req.body.id;
  let newTags = req.body.newtags;

  console.log(id);
  console.log(newTags);

  model.UpdateReferenceTags(id, newTags);
};