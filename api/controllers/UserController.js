'use strict'

import Controller from 'proton-controller'
import _ from 'lodash'

export default class UserController extends Controller {
  * create() {
    try {
      const { body } = this.request
      body.password = yield User.signPassword(body.password)
      const user = yield User.create(body)
      const token = yield Token.generate(user)
      this.response.body = { user, token: token.value }
      return this.response.status = 201
    } catch (err) {
      // proton.log.error('err @ UserController.create', err)
      const userMessage = (err.message.includes('email')) ?
        'The email is already in use' : 'Something wrong happend'
      this.response.body = {
        code: 4409,
        description: err.message,
        userMessage,
      }
      return this.response.status = 409
    }
  }

  * retrieveContacts() {
    try {
      const { user } = this.request
      const id = (this.params.id === 'me' ? user._id : this.params.id)
      const { FirebaseService } = proton.app.services
      const contacts = yield FirebaseService.getContacts(id)
      this.response.body = contacts
      return this.response.status = 201
    } catch (err) {
      // proton.log.error('err @ UserController.retrieveContacts', err)
      const userMessage = 'error retrieving user contacts'
      this.response.body = {
        code: 4409,
        description: err.message,
        userMessage,
      }
      return this.response.status = 409
    }
  }

  * addContact() {
    try {
      const { user } = this.request
      const id = (this.params.id === 'me' ? user._id : this.params.id)
      // proton.log.debug('Id', id)
      const { contact } = this.request.body
      const { FirebaseService } = proton.app.services
      const contacts = yield FirebaseService.getContacts(id)
      if (_.includes(contacts, contact)) {
        const userMessage = 'Cannot include an already included contact'
        this.response.body = {
          code: 4409,
          userMessage,
        }
        return this.response.status = 409
      }
      const firebaseContact = yield FirebaseService.postContact(id, contact)
      this.response.body = { user, firebaseContact }
      return this.response.status = 201
    } catch (err) {
      // proton.log.error('err @ UserController.addContact', err)
      const userMessage = 'error adding user contacts'
      this.response.body = {
        code: 4409,
        description: err.message,
        userMessage,
      }
      return this.response.status = 409
    }
  }
}
