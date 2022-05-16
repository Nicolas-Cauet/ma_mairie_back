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
    console.error(this.url, this.message, new Date());
  }
}

module.exports = APIError;
