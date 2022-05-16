const { appendFile } = require("fs/promises");
const path = require(`path`);
const debug = require(`debug`)(`APIERROR`);

/**
 * @type {class}
 * @namespace APIError
 * @exports APIError
 */
class APIError extends Error {
  constructor(message, url, status = 500) {
    super(message); // super appelle le constructeur du parent
    this.status = status;
    this.url = url;
  }

  /**
   * Méthode pour logger les erreurs
   * @param {string} message d'erreur
   * @returns
   * The method returns an error message in console
   * @returns void
   */
  async log() {
    // Gestion de l'affichage de l'erreur dans la console - instantanéité
    const error = {
      url: this.url,
      message: this.message,
      date: new Date(),
    };
    console.error(this.url, this.message, new Date());
    // Gestion des fichiers de log - historique
    const logPath = path.resolve(__dirname);
    const fileName = `${new Date().toISOString().split(`T`)[0]}.csv`;

    /* converti notre data en un format avec heure et minute (trouvé sur stackoverflow) */

    await appendFile(
      `${logPath}/${fileName}`,
      `${new Date().toLocaleTimeString()},${this.url},${this.message}\n`
    );
    debug(error);
    return error;
  }
}

module.exports = APIError;
