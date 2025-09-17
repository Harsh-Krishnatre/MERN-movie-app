import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <section className="px-4 sm:px-6 lg:px-8">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;
