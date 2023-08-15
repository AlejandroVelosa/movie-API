const request = require("supertest");
const app = require("../app");
require("../models");

let directorId;
const URL_DIRECTOR = "/api/v1/directors";

const directors = {
  firstName: "amelie",
  lastName: "velosa",
  nationality: "USA",
  image:
    "https://media.licdn.com/dms/image/D4E03AQHxpimrL-bosQ/profile-displayphoto-shrink_800_800/0/1684943568314?e=2147483647&v=beta&t=UDH_vofa4baM_eTwb2PzA0QHu_lA6RfcBMjnMwd8bww",
  birthday: "1996-08-21",
};

test("POST ->  'URL_DIRECTOR' should return status code 201", async () => {
  const res = await request(app).post(URL_DIRECTOR).send(directors);

  directorId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directors.firstName);
});

test("GET ALL ->  'URL_DIRECTOR' , should return status code 200 and res.body ti be defined  and res.body.length === 1", async () => {
  const res = await request(app).get(URL_DIRECTOR);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_DIRECTOR/:id' , should return status code 200 and res.body to be defined and res.body.firstName === directors.firstName", async () => {
  const res = await request(app).get(`${URL_DIRECTOR}/${directorId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directors.firstName);
});

test("UPDATE -> 'URL_DIRECTOR/:id', should return status code 200  and res.body.firstName === directorUpdate.firstName", async () => {
  const directorUpdate = {
    firstName: "antonio",
  };
  const res = await request(app)
    .put(`${URL_DIRECTOR}/${directorId}`)
    .send(directorUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directorUpdate.firstName);
});

test("DELETE->  'URL_DIRECTOR/:id' , should return status code 204 ", async () => {
  const res = await request(app).delete(`${URL_DIRECTOR}/${directorId}`);

  expect(res.status).toBe(204);
});
