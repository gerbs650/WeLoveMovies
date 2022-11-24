const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// -- use movies.service file --

// -- validation function to check if movie exists --
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (!movie) {
    next({ status: 404, message: `Movie cannot be found.` });
    return;
  }
  res.locals.movie = movie;
  next();
}

// -- read function --
function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

// -- read + theaters playing function --
async function readTheatersPlayingMovie(req, res) {
  const movieId = res.locals.movie.movie_id;
  const data = await service.readTheatersPlayingMovie(movieId);
  res.json({ data });
}

// -- read + reviews function --
async function readMovieReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const data = await service.readMovieReviews(movieId);
  res.json({ data });
}

// -- list function --
async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await service.listMoviesShowing();
    return res.json({ data });
  }
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheatersPlayingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheatersPlayingMovie),
  ],
  readMovieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readMovieReviews),
  ],
};
