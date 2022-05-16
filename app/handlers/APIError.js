const debug = require(`debug`)(`APIERROR`);

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
   */
  async log() {
    // Gestion de l'affichage de l'erreur dans la console - instantanéité
    const error = {
      url: this.url,
      message: this.message,
      date: new Date(),
    };
    console.error(this.url, this.message, new Date());
    debug(error);
    return error;
  }
}

module.exports = APIError;
