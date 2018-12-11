import User from '../../models/User'

export default {
  currentUser: User.from(localStorage.token)
}

