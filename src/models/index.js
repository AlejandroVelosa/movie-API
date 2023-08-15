const Genre = require("./Genre");
const Actor = require("./Actor");
const Director = require("./Director");
const Movie = require("./Movie");

//Tabla Pivot: "MoviesActors"
Movie.belongsToMany(Actor, { through: "MoviesActors" });
Actor.belongsToMany(Movie, { through: "MoviesActors" });

Movie.belongsToMany(Director, { through: "MoviesDirectors" });
Director.belongsToMany(Movie, { through: "MoviesDirectors" });

Movie.belongsToMany(Genre, { through: "MovieGenres" });
Genre.belongsToMany(Movie, { through: "MoviesGenres" });
