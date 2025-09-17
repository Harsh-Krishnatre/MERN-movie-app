import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Genre from "./models/Genre.js";
import Movie from "./models/Movie.js";

dotenv.config();

const users = [
  {
    username: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
  },
  {
    username: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
  {
    username: "Jane Smith",
    email: "jane@example.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
];

const genres = [
  { name: "Action" },
  { name: "Drama" },
  { name: "Comedy" },
  { name: "Sci-Fi" },
  { name: "Thriller" },
];

const movies = [
  {
    name: "Edge of Tomorrow",
    image: "https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
    year: 2014,
    detail:
      "A soldier relives the same day over and over, each time gaining skills to defeat aliens.",
    cast: ["Tom Cruise", "Emily Blunt"],
    genreName: "Sci-Fi",
  },
  {
    name: "Inception",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    year: 2010,
    detail:
      "A thief who steals corporate secrets through dream-sharing technology is given a chance at redemption.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    genreName: "Thriller",
  },
  {
    name: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    detail:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy.",
    cast: ["Christian Bale", "Heath Ledger"],
    genreName: "Action",
  },
  {
    name: "The Martian",
    image: "https://image.tmdb.org/t/p/original/pupoA7X1Ve90LIQt01MKVNjcMNo.jpg",
    year: 2015,
    detail: "An astronaut becomes stranded on Mars and must find a way to survive.",
    cast: ["Matt Damon", "Jessica Chastain"],
    genreName: "Sci-Fi",
  },
  {
    name: "The Intouchables",
    image: "https://image.tmdb.org/t/p/original/t9o637udumlMDicB1eXXcwAMRKt.jpg",
    year: 2011,
    detail: "After he becomes a quadriplegic, an aristocrat hires a young man to be his caregiver.",
    cast: ["François Cluzet", "Omar Sy"],
    genreName: "Drama",
  },
  {
    name: "Interstellar",
    image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    year: 2014,
    detail: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    genreName: "Sci-Fi",
  },
  {
    name: "Pulp Fiction",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    year: 1994,
    detail: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a diner bandit intertwine in four tales of violence and redemption.",
    cast: ["John Travolta", "Samuel L. Jackson"],
    genreName: "Drama",
  },
  {
    name: "The Avengers",
    image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    year: 2012,
    detail: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    cast: ["Robert Downey Jr.", "Chris Evans"],
    genreName: "Action",
  },
  {
    name: "Deadpool",
    image: "https://image.tmdb.org/t/p/original/5Q94jybSKWDL8CKM58a64xY7Dkn.jpg",
    year: 2016,
    detail: "A fast-talking mercenary with a morbid sense of humor is subjected to a rogue experiment that leaves him with accelerated healing powers and a quest for revenge.",
    cast: ["Ryan Reynolds", "Morena Baccarin"],
    genreName: "Comedy",
  },
  {
    name: "Get Out",
    image: "https://image.tmdb.org/t/p/original/iTwQZzpzmByOlgD6lWxVWXFEHc1.jpg",
    year: 2017,
    detail: "A young African-American visits his white girlfriend's parents for the weekend, where his uneasiness about their reception of him eventually reaches a boiling point.",
    cast: ["Daniel Kaluuya", "Allison Williams"],
    genreName: "Thriller",
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Movie.deleteMany();
    await Genre.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const createdGenres = await Genre.insertMany(genres);
    const nameToGenreId = createdGenres.reduce((acc, g) => {
      acc[g.name] = g._id;
      return acc;
    }, {});

    const preparedMovies = movies.map((m) => ({
      name: m.name,
      image: m.image,
      year: m.year,
      detail: m.detail,
      cast: m.cast,
      genre: nameToGenreId[m.genreName],
      reviews: [
        {
          name: "Admin User",
          rating: 5,
          comment: "Fantastic movie!",
          user: adminUser,
        },
      ],
      numReviews: 1,
    }));

    await Movie.insertMany(preparedMovies);

    console.log("Data Imported!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Movie.deleteMany();
    await Genre.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv.includes("--destroy")) {
  destroyData();
} else {
  importData();
}


