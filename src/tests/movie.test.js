const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let movieId;
const URL_MOVIES = "/api/v1/movies";

const movies = {
  name: "IT",
  image: "imagen IT",
  synopsis: "esto es un pelicula de terror",
  releaseYear: 2015,
};

test("CREATE -> 'URL_MOVIE' should return status code 201 res.body is to be Defiend  and res.body.name === movies.bane", async () => {
  const res = await request(app).post(URL_MOVIES).send(movies);

  movieId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movies.name);
});

test("GET ALL -> 'URL_MOVIE' should return status code 200 res.body is to be Defiend  and res.body.length === 1", async () => {
  const res = await request(app).get(URL_MOVIES);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE  -> 'URL_MOVIE/:id' should return status code 200 res.body is to be Defiend  and res.body.name === movies.bane", async () => {
  const res = await request(app).get(`${URL_MOVIES}/${movieId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movies.name);
});

test("UPDATE  -> 'URL_MOVIE/:id' should return status code 200 res.body is to be Defiend  and res.body.name === moviesUpdate.bane", async () => {
  const moviesUpdate = {
    name: "IT",
    image: "imagen IT",
    synopsis: "esto es un pelicula de terror",
    releaseYear: 2015,
  };
  const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send(moviesUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(moviesUpdate.name);
});

test("POST -> 'URL_MOVIE/:id/actors' should return status code 200  and res.body.length ===1", async () => {
  const actor = {
    firstName: "amelie",
    lastName: "velosa",
    nationality: "USA",
    image:
      "https://media.licdn.com/dms/image/D4E03AQHxpimrL-bosQ/profile-displayphoto-shrink_800_800/0/1684943568314?e=2147483647&v=beta&t=UDH_vofa4baM_eTwb2PzA0QHu_lA6RfcBMjnMwd8bww",
    birthday: "1996-08-21",
  };

  const createActor = await Actor.create(actor);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([createActor.id]);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createActor.id);
  await createActor.destroy();
});

test("POST -> 'URL_MOVIE/:id/directors' should return status code 200  and res.body.length ===1", async () => {
  const director = {
    firstName: "amelie",
    lastName: "velosa",
    nationality: "USA",
    image:
      "https://media.licdn.com/dms/image/D4E03AQHxpimrL-bosQ/profile-displayphoto-shrink_800_800/0/1684943568314?e=2147483647&v=beta&t=UDH_vofa4baM_eTwb2PzA0QHu_lA6RfcBMjnMwd8bww",
    birthday: "1996-08-21",
  };

  const createDirector = await Director.create(director);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([createDirector.id]);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createDirector.id);
  await createDirector.destroy();
});

test("POST -> 'URL_MOVIE/:id/genres' should return status code 200  and res.body.length ===1", async () => {
  const genre = {
    name: "action",
  };

  const createGenre = await Genre.create(genre);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([createGenre.id]);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createGenre.id);
  await createGenre.destroy();
});

test("DELETE->  '/api/v1/artist/:id' , should return status code 204 ", async () => {
  const res = await request(app).delete(`${URL_MOVIES}/${movieId}`);

  expect(res.status).toBe(204);
});
