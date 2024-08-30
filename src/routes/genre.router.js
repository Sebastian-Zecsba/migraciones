const { getAll, create, getOne, remove, update } = require('../controllers/gerne.controllers');
const express = require('express');

const routerGenre = express.Router();

routerGenre.route('/')
    .get(getAll)
    .post(create);

routerGenre.route('/:id')
    .get(getOne)
    .delete(remove)

module.exports = routerGenre;