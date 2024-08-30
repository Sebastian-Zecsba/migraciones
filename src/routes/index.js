const express = require('express');
const routerMovie = require('./movie.router');
const routerDirector = require('./directos.router');
const routerGenre = require('./genre.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/movies', routerMovie)
router.use('/directors', routerDirector)
router.use('/genres', routerGenre)

module.exports = router;
