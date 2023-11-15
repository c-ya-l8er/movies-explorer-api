const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');
const statusCodes = require('../utils/constants').HTTP_STATUS;
const NOT_FOUND_ERROR = require('../errors/NotFound');
const BAD_REQUEST_ERROR = require('../errors/BadRequest');
const FORBIDDEN_ERROR = require('../errors/Forbidden');
const {
  NOT_FOUND_MESSAGE,
  BAD_REQUEST_MESSAGE,
  FORBIDDEN_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(statusCodes.OK).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(statusCodes.CREATED).send(movie))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BAD_REQUEST_ERROR(BAD_REQUEST_MESSAGE));
      }
      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NOT_FOUND_ERROR(NOT_FOUND_MESSAGE))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new FORBIDDEN_ERROR(FORBIDDEN_MESSAGE));
      }
      return Movie.deleteOne(movie).then(() => res.status(statusCodes.OK).send(movie));
    })
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BAD_REQUEST_ERROR(BAD_REQUEST_MESSAGE));
      }
      return next(error);
    });
};
