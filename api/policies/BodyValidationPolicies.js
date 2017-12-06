'use strict'

import Policy from 'proton-policy'
import PostUserValidator from '../../config/validators/PostUserValidator.js'

export default class BodyValidationPolicies extends Policy {

  * postUser(next) {
    try {
      PostUserValidator.validate(this.request.body)
      yield next
    } catch (err) {
      this.response.body = {
        code: 1400,
        description: PostUserValidator.native.errorsText(err),
        userMessage: 'Por favor, verifica los datos ingresados e intenta de nuevo'
      }
      return this.response.status = 400
    }
  }


}
