'use strict'

import Policy from 'proton-policy'

const opts = { session: false }

export default class AuthPolicies extends Policy {

  * local(next) {
    const { email, password } = this.request.body
    this.request.query = { email, password }
    const cb = function * (err, user, info) {
      if (err || !user) {
        proton.log.warn('Error authenticating the user', err)
        this.response.status = 401
        return this
      }
      // proton.log.debug('User @ AuthPolicies', user)
      this.request.user = user
      if (info) throw info
      return yield next
    }.bind(this)
    try {
      yield passport.authenticate('local', {}, cb).call(this)
    } catch (err) {
      this.response.body = {
        code: 2000 + (err.code || 401),
        description: err.message,
        userMessage: 'Invalid crendentials',
      }
      this.response.status = 401
    }
  }

  * bearer(next) {
    const cb = function * (err, user, scope) {
      if (err || !user) {
        proton.log.warn('Error authenticating the user using bearer', err, user)
        this.response.status = 401
        return this
      }
      // proton.log.debug('User @ Bearer', user)
      this.request.user = user
      this.request.scope = scope
      return yield next
    }.bind(this)
    try {
      yield passport.authenticate('bearer', opts, cb).call(this)
    } catch (err) {
      proton.log.error('Error on bearer authentication', err)
    }
  }

}
