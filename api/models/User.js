
import Model from 'proton-mongoose-model'
import Hat from 'hat'
import Crypto from 'crypto'
import config from './../../config'

/*
 *------------------------------------------------------------------------------
 *                                    Sub Schemas
 *------------------------------------------------------------------------------
 */


/*
 *------------------------------------------------------------------------------
 *                              Principal Schema
 *------------------------------------------------------------------------------
 */


export default class User extends Model {

  schema() {
    return {
      firstName: String,
      lastName: String,
      email: {
        type: String,
        unique: true,
        sparse: true,
        validate: [v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v), 'Invalid email format'],
      },
      password: {
        type: String,
        min: 8,
        default: () => Hat().substring(0, 8)
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
      lastLoginAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
    }
  }


  /*
   *----------------------------------------------------------------------------
   *                            Life cycle methods
   *----------------------------------------------------------------------------
   */


  /*
   *----------------------------------------------------------------------------
   *                              Attr Methods
   *----------------------------------------------------------------------------
   */


  /*
   *----------------------------------------------------------------------------
   *                              Static Methods
   *----------------------------------------------------------------------------
   */

  static signPassword(password) {
    return Crypto.createHash('sha256')
      .update(`${config.kogiSecretKeySignature}:${password}`).digest('base64')
  }

  static findByEmailAndPassword({ email, password }) {
    return this.signPassword(password)
    .then(hash => this.findOne({ email, password: hash }).lean())
  }

}

/*
 *----------------------------------------------------------------------------
 *                              Private functions
 *----------------------------------------------------------------------------
 */
