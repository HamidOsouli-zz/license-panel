class Auth {
  constructor() {
    this.getUserName = this.getUserName.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.setUserToLocalStorage = this.setUserToLocalStorage.bind(this)
    this.getUserFromLocalStorage = this.getUserFromLocalStorage.bind(this)
  }

  getUserName() {
    const user = this.getUserFromLocalStorage()
    return user.name
  }

  isAuthenticated() {
    const user = this.getUserFromLocalStorage()
    if (user) {
      if (user.expiresAt > new Date().getTime()) {
        return true
      } else {
        return false
      }
    }
  }

  signIn(values) {
    const nowDate = new Date()
    const hour = nowDate.getHours()
    const expireDate = nowDate.setHours(hour + 1)

    if (values.username === 'user1' && values.password === '123') {
      const user = {
        name: values.username,
        role: 'user',
        expiresAt: expireDate
      }
      this.setUserToLocalStorage(user)
      return true
    } else {
      return false
    }
  }

  signOut() {
    localStorage.clear()
    return true
  }

  setUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  }
}

const authClient = new Auth()

export default authClient
