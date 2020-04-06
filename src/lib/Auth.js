class Auth {
  constructor() {
    this.getProfile = this.getProfile.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.setUserToLocalStorage = this.setUserToLocalStorage.bind(this)
    this.getUserFromLocalStorage = this.getUserFromLocalStorage.bind(this)
  }

  getProfile() {
    return this.profile
  }

  isAuthenticated() {
    return false
    const user = this.getUserFromLocalStorage()
    if (user !== null) {
      const expiresAt = user.exp * 1000
      if (new Date().getTime() < expiresAt) {
        return new Date().getTime() < expiresAt
      } else {
        localStorage.clear()
      }
    }
    return new Date().getTime() < this.expiresAt * 1000
  }

  signIn() {
    // this.signOut()
  }

  signOut() {
    localStorage.clear()
    this.idToken = null
    this.profile = null
    this.expiresAt = null
  }

  setUserToLocalStorage(user) {
    // localStorage.setItem('user', JSON.stringify(user))
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  }
}

const authClient = new Auth()

export default authClient
