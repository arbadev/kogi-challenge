'use strict'
import Router from 'koa-router'

const router = new Router({ prefix: '/users' })
const { AuthPolicies, BodyValidationPolicies } = proton.app.policies
const { UserController, AuthController } = proton.app.controllers

router.post('/', BodyValidationPolicies.postUser, UserController.create)

router.post('/auth', AuthPolicies.local, AuthController.authenticate)

router.get('/me/contacts', AuthPolicies.bearer, UserController.retrieveContacts)

router.get('/:id/contacts', AuthPolicies.bearer, UserController.retrieveContacts)

router.post('/me/contacts', AuthPolicies.bearer, UserController.addContact)

router.post('/:id/contacts', AuthPolicies.bearer, UserController.addContact)


module.exports = router
