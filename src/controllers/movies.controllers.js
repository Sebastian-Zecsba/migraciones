const catchError = require('../utils/catchError');
const { movie, directors, genre } = require('../models');

const getAll = catchError(async(req, res) => {
    const results = await movie.findAll({include: [directors]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenre = catchError(async(req, res) => {
    const { id } = req.params;
    const movies = await movie.findByPk(id)
    if(!movies) return res.json({message: "Movie not found"})
    
    await movies.setGenres(req.body)

    const genres = await movies.getGenres()
    return res.json(genres)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenre
}