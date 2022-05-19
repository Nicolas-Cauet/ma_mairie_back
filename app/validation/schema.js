const schemaCreationAdmin = require(`./schema/schemaCreateAdmin`);
const schemaCreateReportingUser = require(`./schema/schemaCreateReportingUser`);
const schemaValidateReportingUser = require(`./schema/schemaValidateReportingUser`);
const schemaCreateArticle = require(`./schema/schemaCreateArticle`);
const schemaUpdateArticle = require(`./schema/schemaUpdateArticle`);
const schemaCreateCouncilMember = require(`./schema/schemaCreateCouncilMember`);
const schemaUpdateCouncilMember = require(`./schema/schemaUpdateCouncilMember`);

module.exports = {
  schemaCreateArticle,
  schemaCreationAdmin,
  schemaValidateReportingUser,
  schemaCreateReportingUser,
  schemaUpdateArticle,
  schemaCreateCouncilMember,
  schemaUpdateCouncilMember,
};
