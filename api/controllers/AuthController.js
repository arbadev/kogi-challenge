
import Controller from 'proton-controller'

export default class AuthController extends Controller {

  * authenticate() {
    try {
      const { user } = this.request
      const token = yield Token.generate(user)
      this.response.body = { user, token: token.value }
      this.response.status = 200
    } catch (err) {
      proton.log.error('Error authenticating the user', err)
      this.response.status = 400
    }
  }
}
