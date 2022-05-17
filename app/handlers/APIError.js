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
   * The method returns an error message in console
   * @returns void
   */
  async log() {
    // Gestion de l'affichage de l'erreur dans la console - instantanéité
    console.error(this.message);
  }
}

module.exports = APIError;
