import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import StreamingLinks from "../../component/StreamingLinks";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-teal-400 font-semibold hover:underline flex items-center"
          >
            ← Go Back
          </Link>
        </div>

        <div className="space-y-8">
          {/* Movie Info with Poster */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Movie Poster - Left Side */}
            <div className="lg:col-span-1">
              <img
                src={movie?.image}
                alt={movie?.name}
                className="w-full max-w-xs rounded-lg shadow-2xl mx-auto lg:mx-0"
              />
            </div>

            {/* Movie Details - Right Side */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h2 className="text-4xl lg:text-5xl my-4 font-extrabold">{movie?.name}</h2>
                <p className="my-4 text-[#B0B0B0] text-lg leading-relaxed">
                  {movie?.detail}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-2xl font-semibold text-teal-400">
                    Release Year: {movie?.year}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Cast</h3>
                  <div className="space-y-2">
                    {movie?.cast?.map((actor, index) => (
                      <div key={index} className="text-[#B0B0B0]">
                        • {actor}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Streaming Links Section */}
          <div className="mt-8">
            <StreamingLinks movie={movie} />
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <MovieTabs
              loadingMovieReview={loadingMovieReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              movie={movie}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
