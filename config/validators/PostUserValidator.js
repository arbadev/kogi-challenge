import Ajv from 'ajv'

export default class PostUserValidator {

  constructor() {
    const ajv = new Ajv()
    this._validate = ajv.compile(PostUserValidator.schema)
    PostUserValidator._singleton = this
    PostUserValidator._native = ajv
  }

  static get schema() {
    return {
      properties: {
        firstName: { type: 'string', minLength: 3 },
        lastName: { type: 'string', minLength: 3 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
      },
      required: ['firstName', 'lastName', 'email', 'password'],
    }
  }

  static validate(data) {
    const instance = (PostUserValidator._singleton) ?
      PostUserValidator._singleton : new PostUserValidator()
    if (instance._validate(data)) return true
    throw instance._validate.errors
  }

  static get native() {
    return PostUserValidator._native
  }

}
