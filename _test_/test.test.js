/* eslint-disable no-undef */
const request = require(`supertest`);

const app = require(`../index`);

describe(`AdminReportingController`, () => {
  it(`POST /login ---> request.body`, () => {
    request(app)
      .post(`/login`)
      .expect(`Content-Type`, /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            email: expect.toBeDefined(),
            password: expect.any(String),
          }),
        );
      })
      .catch((err) => {
        expect(err.message);
      });
  });
  it(`GET reporting/:town_hall_id/:reporting_id ----> specific reporting`, () => {
    request(app)
      .get(`/reporting/1/1`)
      .expect(`Content-Type`, /json/)
      .expect(200)
      .then((response) => {
        expect(response.body)
          .toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                reporting_id: expect.any(Number),
                title: expect.any(String),
                email: expect.any(String),
                phonenumber: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                user_image: expect.any(String),
                user_ip: expect.any(String),
                admin_text: expect.any(String),
                admin_image: expect.any(String),
                reporting_category: expect(String),
              }),
            ]),
          );
      });
  });
  it(`POST /reporting/:town_hall_id ----> Create reporting`, () => {});
  it(`GET /reporting/:town_hall_id ----> validate request body`, () => {});
});
