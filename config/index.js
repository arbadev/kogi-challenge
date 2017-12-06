'use strict'


const config = {
  env: process.env.NODE_ENV || 'dev',
  firebaseApiKey: process.env.FIREBASE_API_KEY,
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
  firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  kogiSecretKeySignature: process.env.KOGI_SECRET_KEY_SIGNATURE,
}

module.exports = config
