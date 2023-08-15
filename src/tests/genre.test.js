const request = require("supertest");
const app = require("../app");
require("../models");

let genreId;
const URL_GENRES = "/api/v1/genres";

const genres = {
  name: "family",
};

test("POST ->  'URL_GENRES', should return status code 201", async () => {
  const res = await request(app).post(URL_GENRES).send(genres);

  genreId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

test("GET ALL -> 'URL_GENRES', should return status code 200  res.body.length=== genres.name", async () => {
  const res = await request(app).get(URL_GENRES);
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined;
  expect(res.body).toHaveLength(1);
});

test("GET ONE ->'URL_GENRES/:id',should return status code  200 res.body.name === genres.name", async () => {
  const res = await request(app).get(`${URL_GENRES}/${genreId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

test("PUT -> 'URL_GENRES/:id' should return status code 200  res.body.name === genresUpdate.name", async () => {
  const genresUpdate = {
    name: "action",
  };
  const res = await request(app)
    .put(`${URL_GENRES}/${genreId}`)
    .send(genresUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genresUpdate.name);
});

test("DELETE --> 'URL_GENRES/:id' , should return status code 204", async () => {
  const res = await request(app).delete(`${URL_GENRES}/${genreId}`);
  expect(res.statusCode).toBe(204);
});
