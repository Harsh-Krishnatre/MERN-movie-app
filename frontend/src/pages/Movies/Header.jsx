import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <nav className="flex flex-row lg:flex-col gap-4 lg:min-w-[200px]">
          <Link
            to="/"
            className="transition duration-300 ease-in-out hover:bg-teal-600 px-4 py-2 rounded text-sm whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="transition duration-300 ease-in-out hover:bg-teal-600 px-4 py-2 rounded text-sm whitespace-nowrap"
          >
            Browse Movies
          </Link>
        </nav>

        <div className="flex-1 min-w-0 w-full">
          <SliderUtil data={data} />
        </div>
      </div>
    </div>
  );
};

export default Header;
