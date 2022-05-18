const dataMapperCouncil = require(`../models/dataMapper/dataMapperCouncil`);
/**
 * @type {Object}
 * @export adminControllerCouncil
 * @namespace adminControllerCouncil
 */
const adminControllerCouncil = {
  /** The method returns the list of municipal councilors and the mayor
   * @menberof adminControllerCouncil
   * @method allCouncil
   * @param {Object} req
   * @param {Object} res
   * @returns {Array} Return all municipal councilors
   */
  async allCouncil(req, res, next) {
    const townHallStaff = await dataMapperCouncil.getAllCouncil(
      parseInt(req.params.town_hall_id, 10),
    );
    if (townHallStaff) {
      res.json(townHallStaff).status(200);
    } else {
      const err = new Error(
        `Impossible de récupèrer les Conseillers`,
      );
      next(err);
    }
  },
  async postOneMember(req, res, next) {
    const member = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      role: req.body.role,
      townHallId: req.params.town_hall_id,
    };
    const result = await dataMapperCouncil.postMemberCouncil(member);
    if (result.rowCount) {
      res.status(200).send(`Votre ajout à été effectué !`);
    } else {
      const err = new Error(
        `La mise à jour n'est pas possible !`,
      );
      next(err);
    }
  },
  async deleteMemberCouncil(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'avez pas accès à cette page !`,
      );
      err.status = 401;
      next(err);
    }
    const report = await dataMapperCouncil.deleteMember(req.params.Council_id);
    if (report.rowCount) {
      res.status(200).send(`Le Membre à bien été supprimer !`);
    } else {
      // throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  async modifyMemberCouncil(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'avez pas accès à cette page !`,
      );
      err.status = 401;
      next(err);
    }
    const values = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      role: req.body.role,
      townHallId: req.params.town_hall_id,
    };
    const report = await dataMapperCouncil.modifyCouncil(values);
    if (report.rowCount) {
      res.status(200).send(`La mise à jour est bien passée.`);
    } else {
      const err = new Error(
        `La mise à jour n'est pas possible !`,
      );
      next(err);
    }
  },
};

module.exports = adminControllerCouncil;
