
import Service from 'proton-service'
import Model from 'proton-mongoose-model'
import firebase from 'firebase'
import _ from 'lodash'
import config from './../../config'

/*
 * -----------------------------------------------------------------------------
 *                                Constants
 * -----------------------------------------------------------------------------
 */

const firebaseOpts = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  databaseURL: config.firebaseDatabaseUrl,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
}

firebase.initializeApp(firebaseOpts)

const db = firebase.database()
const contacts = db.ref('contacts')

export default class FirebaseService extends Service {

  postContact(id, contact) {
    return contacts.child(`${id}`).push(contact)
    .then(() => {
      proton.log.debug(`added contact ${contact} to user ${id}`)
      return contact
    })
    .catch(err => proton.log.debug('error', err))
  }

  getContacts(id) {
    return contacts.child(`${id}`).once('value')
    .then((response) => {
      const contactsValue = response.val()
      if (_.isEmpty(contactsValue)) return []
      const firebaseContacts = Object.keys(contactsValue).map(k => contactsValue[k])
      proton.log.debug(`Retrieve contacts ${firebaseContacts} to user ${id}`)
      return firebaseContacts
    })
    .catch(err => proton.log.debug('error', err))
  }

}

/*
 * -----------------------------------------------------------------------------
 *                             FireBase Events
 * -----------------------------------------------------------------------------
 */

// contacts.on('child_changed', logContacts)
contacts.on('child_added', logContacts)

function logContacts(snap) {
  const _id = Model.parseObjectId(snap.key)
  const contactsSnap = snap.val()
  proton.log.debug(`Firebase ---> user ${_id} contacts`, contactsSnap)
}
