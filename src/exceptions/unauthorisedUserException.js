export default class UnauthorisedUserException extends Error {
  constructor() {
    super();
    this.message = 'Invalid credentials !';
    this.status = 400;
  }
}
