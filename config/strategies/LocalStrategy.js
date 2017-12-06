'use strict'

import Strategy from 'passport-local'

export default class LocalStrategy extends Strategy {

  constructor() {
    super(LocalStrategy.opts(), LocalStrategy.strategy)
  }

  static strategy(req, email, password, done) {
    User.findByEmailAndPassword({ email, password })
    .then(user => {
      done(null, user)
    })
    .catch(err => done(err, null))
  }

  static opts() {
    return { usernameField: 'email', session: false, passReqToCallback: true }
  }

}
