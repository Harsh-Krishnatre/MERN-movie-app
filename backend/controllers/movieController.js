import Movie from "../models/Movie.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createMovie = asyncHandler(async (req, res) => {
  const newMovie = new Movie(req.body);
  const savedMovie = await newMovie.save();
  res.json(savedMovie);
});

const getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find().populate('genre', 'name');
  res.json(movies);
});

const getSpecificMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const specificMovie = await Movie.findById(id).populate('genre', 'name');
  if (!specificMovie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.json(specificMovie);
});

const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
  }).populate('genre', 'name');

  if (!updatedMovie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.json(updatedMovie);
});

const movieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    const alreadyReviewed = movie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Movie already reviewed");
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    movie.reviews.push(review);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Movie not found");
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteMovie = await Movie.findByIdAndDelete(id);

  if (!deleteMovie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.json({ message: "Movie Deleted Successfully" });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { movieId, reviewId } = req.body;
  const movie = await Movie.findById(movieId);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  const reviewIndex = movie.reviews.findIndex(
    (r) => r._id.toString() === reviewId
  );

  if (reviewIndex === -1) {
    res.status(404);
    throw new Error("Comment not found");
  }

  movie.reviews.splice(reviewIndex, 1);
  movie.numReviews = movie.reviews.length;
  movie.rating =
    movie.reviews.length > 0
      ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length
      : 0;

  await movie.save();
  res.json({ message: "Comment Deleted Successfully" });
});

const getNewMovies = asyncHandler(async (req, res) => {
  const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10).populate('genre', 'name');
  res.json(newMovies);
});

const getTopMovies = asyncHandler(async (req, res) => {
  const topRatedMovies = await Movie.find()
    .sort({ numReviews: -1 })
    .limit(10)
    .populate('genre', 'name');
  res.json(topRatedMovies);
});

const getRandomMovies = asyncHandler(async (req, res) => {
  const randomMovies = await Movie.aggregate([
    { $sample: { size: 10 } },
    { $lookup: { from: 'genres', localField: 'genre', foreignField: '_id', as: 'genre' } },
    { $unwind: '$genre' },
    { $project: { 'genre._id': 1, 'genre.name': 1, name: 1, image: 1, year: 1, detail: 1, cast: 1, reviews: 1, numReviews: 1, rating: 1, createdAt: 1 } }
  ]);
  res.json(randomMovies);
});

export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
};
