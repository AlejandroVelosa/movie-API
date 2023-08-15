const request = require("supertest");
const app = require("../app");
request("../models");

let actorId;
const URL_ACTOR = "/api/v1/actors";

const actors = {
  firstName: "amelie",
  lastName: "velosa",
  nationality: "USA",
  image:
    "https://media.licdn.com/dms/image/D4E03AQHxpimrL-bosQ/profile-displayphoto-shrink_800_800/0/1684943568314?e=2147483647&v=beta&t=UDH_vofa4baM_eTwb2PzA0QHu_lA6RfcBMjnMwd8bww",
  birthday: "1996-08-21",
};

test("POST -> 'URL_ACTOR' should return status code 201 and res.body.firstName ===actors.firstName", async () => {
  const res = await request(app).post(URL_ACTOR).send(actors);

  actorId = res.body.id;
  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actors.firstName);
});

test("GET -> 'URL_ACTOR' should return status code 200 and res.body to be defined and res.body.length ===1", async () => {
  const res = await request(app).get(URL_ACTOR);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE --> 'URL_ACTOR/:id', should return status code 200 and res.body to be defined and res.body.firstName = actors.firstName", async () => {
  const res = await request(app).get(`${URL_ACTOR}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actors.firstName);
});

test("UPDATE 'URL_ACTOR/:id', should return status code 200 and res.body.firstName === actorUpdate.firstName", async () => {
  const actorUpdate = {
    firstName: "amelie lends",
  };

  const res = await request(app)
    .put(`${URL_ACTOR}/${actorId}`)
    .send(actorUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdate.firstName);
});

test("DELETE->  'URL_ACTOR/:id' , should return status code 204 ", async () => {
  const res = await request(app).delete(`${URL_ACTOR}/${actorId}`);
  expect(res.status).toBe(204);
});
