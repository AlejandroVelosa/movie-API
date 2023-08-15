const catchError = require("../utils/catchError");
const Genre = require("../models/Genre");

const getAll = catchError(async (req, res) => {
  const results = await Genre.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const results = await Genre.create(req.body);
  return res.status(201).json(results);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Genre.findByPk(id);
  if (!results) return res.sendStatus(404);
  return res.json(results);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Genre.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const results = await Genre.update(req.body, {
    where: { id },
    returning: true,
  });
  if (!results[0] === 0) return res.sendStatus(404);
  return res.json(results[1][0]);
});
module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
