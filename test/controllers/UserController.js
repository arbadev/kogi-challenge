/* eslint no-undef: 0 */

import supertest from 'co-supertest'
import app from '../../server.js'
import { expect } from 'chai'
import hat from 'hat'

const request = supertest(app)

describe('UserController', () => {
  let [and3, and3Fake, kogi, duplicated, testContacts] = []

  let users = [
    {
      firstName: 'andres',
      lastName: 'barradas',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      email: 'a3barradas@gmail.com',
      password: '87985748a3',
    },
    {
      firstName: 'andres',
      lastName: 'fake',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      // email: 'a3barradas@gmail.com',
      password: '87985748a3',
    },
    {
      firstName: 'kogi',
      lastName: 'isKogi',
      avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAYcAAAAJDQ2MDc2ZDVjLWU3M2UtNGViMi05MjYxLTkzZWQ1ZDg3YzJmOQ.png',
      gender: 'male',
      email: 'sayhi@kogi.com',
      password: '87985748a3',
    },
    {
      firstName: 'andres',
      lastName: 'barradas',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      email: 'a3barradas@gmail.com',
      password: '87985748a3',
    },
    {
      firstName: 'andresTestContacts',
      lastName: 'barradasTestContacts',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      email: 'a3barradasTest@gmail.com',
      password: '87985748a3',
    },
  ]

  const credentials = { email: 'a3barradas@gmail.com', password: '87985748a3' }
  const fakeCredentials = { email: 'a3barrad@gmail.com', password: '87985748a3' }

  const value = hat()
  const kogiContact = { contact: `${value}@kogi.com` }

  and3 = users[0]
  and3Fake = users[1]
  kogi = users[2]
  duplicated = users[3]
  before(function*() {
    testContacts = yield User.create(users[4])
    testContacts.token = yield Token.generate(testContacts)
    // kogi.token = yield Token.generate(kogi)
    // duplicated.token = yield Token.generate(duplicated)
  })

  after(function*() {
    users = users.map(u => u._id)
    yield [User.remove(users)]
  })

  it('should not create and3Fake user without email', function*() {
    const response = yield request
    .post('/users')
    .send(and3Fake)
    .expect(400)
    // proton.log.debug('and3', response)
  })

  it('should create and3 user', function*() {
    const response = yield request
    .post('/users')
    .send(and3)
    .expect(201)
    // proton.log.debug('and3', response)
  })

  it('should create kogi user', function*() {
    const response = yield request
    .post('/users')
    .send(kogi)
    .expect(201)
    // proton.log.debug('kogi', response)
  })

  it('should not create duplicated user', function*() {
    const response = yield request
    .post('/users')
    .send(duplicated)
    .expect(409)
    // proton.log.debug('duplicated', response)
  })

  it('should auth and3 user', function*() {
    const response = yield request
    .post('/users/auth')
    .send(credentials)
    .expect(200)
    // proton.log.debug('user', response)
  })

  it('should not auth fake and3 user', function*() {
    const response = yield request
    .post('/users/auth')
    .send(fakeCredentials)
    .expect(401)
    // proton.log.debug('user', response)
  })

  it('should add KOGI as and3 testContacts', function*() {
    const response = yield request
    .post('/users/me/contacts')
    .set('Authorization', `Bearer ${testContacts.token.value}`)
    .send(kogiContact)
    .expect(201)
    // proton.log.debug('response', response)
  })

  it('should not add KOGI as and3 testContacts', function*() {
    const response = yield request
    .post('/users/me/contacts')
    .set('Authorization', `Bearer ${testContacts.token.value}`)
    .send(kogiContact)
    .expect(409)
    // proton.log.debug('response', response)
  })
})
