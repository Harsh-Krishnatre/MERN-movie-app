import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(selectedGenre === genreId ? null : genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => {
      if (selectedGenre === null) return true;
      // Handle both populated and unpopulated genre fields
      const movieGenreId = movie.genre?._id || movie.genre;
      return movieGenreId === selectedGenre;
    }
  );

  // Debug logging
  console.log("Selected genre:", selectedGenre);
  console.log("Movies data:", data);
  console.log("Filtered movies:", filteredMovies);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      <nav className="flex flex-wrap gap-2 lg:flex-col lg:min-w-[200px]">
        <button
          className={`transition duration-300 ease-in-out hover:bg-gray-700 px-4 py-2 rounded text-sm whitespace-nowrap ${
            selectedGenre === null ? "bg-gray-700 text-white" : "text-gray-300"
          }`}
          onClick={() => setSelectedGenre(null)}
        >
          All Genres
        </button>
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out hover:bg-gray-700 px-4 py-2 rounded text-sm whitespace-nowrap ${
              selectedGenre === g._id ? "bg-gray-700 text-white" : "text-gray-300"
            }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <section className="flex-1 min-w-0">
        <div className="w-full mb-8">
          <h1 className="mb-5 text-xl font-semibold">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full mb-8">
          <h1 className="mb-5 text-xl font-semibold">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full mb-8">
          <h1 className="mb-5 text-xl font-semibold">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
