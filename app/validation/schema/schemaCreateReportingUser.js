/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaCreateReportingUser = joi.object({
  reporting_category: joi.string().required(),
  title: joi.string().min(5).max(20).required(),
  user_text: joi.string().required(),
  email: joi.string().email().required(),
  first_name: joi.string().required().max(20),
<<<<<<< HEAD
<<<<<<< HEAD
  last_name: joi.string().required.max(20),
  phone_number: joi.string().min(10).max(10),
  town_hall_id: joi.string(),
=======
  last_name: joi.string().required().max(20),
  phonenumber: joi.string().min(10).max(10),
  town_hall_id: joi.number(),
>>>>>>> reporting
=======
  last_name: joi.string().required().max(20),
  phonenumber: joi.string().min(10).max(10),
  town_hall_id: joi.number(),
>>>>>>> 5853bdf2793af3884d53a2c28032ce5236f62d86
});

module.exports = schemaCreateReportingUser;