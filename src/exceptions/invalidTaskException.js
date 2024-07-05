export default class InvalidTaskException extends Error {
  constructor(errors) {
    super();
    this.message = 'Something went wrong. Please try again.';
    this.status = 400;
    this.errors = errors;
  }
}
