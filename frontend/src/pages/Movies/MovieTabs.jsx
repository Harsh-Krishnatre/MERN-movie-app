import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="space-y-8">
      {/* Review Form Section */}
      <section className="bg-[#1A1A1A] p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-lg mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border rounded-lg text-black bg-white"
                placeholder="Share your thoughts about this movie..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition duration-300"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg mb-4">
              Please <Link to="/login" className="text-teal-400 hover:underline">Sign In</Link> to write a review
            </p>
          </div>
        )}
      </section>

      {/* Reviews Display Section */}
      <section>
        <h3 className="text-2xl font-bold mb-6">User Reviews</h3>
        
        {movie?.reviews?.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg">No reviews yet. Be the first to review this movie!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {movie?.reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-6 rounded-lg border border-gray-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <strong className="text-teal-400 text-lg">{review.name}</strong>
                  <p className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-200 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
