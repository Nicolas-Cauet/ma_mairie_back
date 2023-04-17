const dataMapperCouncil = require(`../models/dataMapper/dataMapperCouncil`);
const HandleError = require(`../handlers/handleError`);

/**
 * @type {Object}
 * @export adminControllerCouncil
 * @namespace adminControllerCouncil
 */
const adminControllerCouncil = {
  /** The method returns the list of municipal councilors and the mayor as visitor
   * @menberof adminControllerCouncil
   * @method allCouncil
   * @param {Object} req
   * @param {Object} res
   * @returns {Array} Return all municipal councilors
   */
  async allCouncil(req, res) {
    const townHallStaff = await dataMapperCouncil.getAllCouncil(
      parseInt(req.params.town_hall_id, 10),
    );
    if (townHallStaff) {
      res.json(townHallStaff).status(200);
    } else {
      throw new HandleError(`Impossible de récupèrer les Conseillers.`);
    }
  },
  /** this method posts a new advisor member as administrator
   * @menberof adminControllerCouncil
   * @method postOneMember
   * @param {Object} req
   * @param {Object} res
   * @returns {void} post the new adviser
   */
  async postOneMember(req, res) {
    const member = {
      lastName: req.body.last_name,
      firstName: req.body.first_name,
      role: req.body.role,
      photo: req.body.photo,
      townHallId: req.params.town_hall_id,
    };
    const result = await dataMapperCouncil.postMemberCouncil(member);
    if (result.rowCount) {
      res.status(200).json(`Votre ajout à été effectué.`);
    } else {
      throw new HandleError(`La mise à jour n'est pas possible.`);
    }
  },
  /**
    this method removes a board member by his id as administrator
  * @menberof adminControllerCouncil
  * @method deleteMemberCouncil
  * @param {Object} req
  * @param {Object} res
  * @returns {array}delete the board member
  */
  async deleteMemberCouncil(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new HandleError(`Vous n'avez pas accès à cette page.`, 401);
    }
    const report = await dataMapperCouncil.deleteMember(req.params.town_hall_staff_id);
    if (report.rowCount) {
      res.status(200).send(`Le Membre à bien été supprimer.`);
    } else {
      throw new HandleError(`La suppression du membre n'est pas possible.`);
    }
  },
  /**
    this method modify a board member by his id as administrator
  * @menberof adminControllerCouncil
  * @method modifyMemberCouncil
  * @param {Object} req
  * @param {Object} res
  * @returns {array}modify the board member
  */

  async modifyMemberCouncil(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new HandleError(`Vous n'avez pas accès à cette page.`, 401);
    }
    const values = {
      lastName: req.body.last_name,
      firstName: req.body.first_name,
      role: req.body.role,
      photo: req.body.photo,
      townHallStaffId: req.params.town_hall_staff_id,
    };
    const report = await dataMapperCouncil.modifyCouncil(values);
    if (report.rowCount) {
      res.status(200).json(`La mise à jour du membre du conseiller, c'est bien passé.`);
    } else {
      throw new HandleError(`La mise à jour n'est pas possible.`);
    }
  },
};

module.exports = adminControllerCouncil;
