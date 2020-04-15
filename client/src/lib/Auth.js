import API from './API'

class Auth {
  constructor() {
    this.getUserInfo = this.getUserInfo.bind(this)
    this.getUserToken = this.getUserToken.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.setUserToLocalStorage = this.setUserToLocalStorage.bind(this)
    this.getUserFromLocalStorage = this.getUserFromLocalStorage.bind(this)
  }

  getUserInfo() {
    const user = this.getUserFromLocalStorage()
    return user
  }

  getUserToken() {
    const user = this.getUserFromLocalStorage()
    return user.accessToken
  }

  isAuthenticated() {
    const user = this.getUserFromLocalStorage();
    if (user) {
      if (user.expiresAt > new Date().getTime()) {
        return true
      } else {
        return false
      }
    }
  }

  async signIn(values) {
    const nowDate = new Date()
    const hour = nowDate.getHours()
    const expireDate = nowDate.setHours(hour + 1)
    const config = {
      method: 'post',
      endpoint: '/user/login',
      data: JSON.stringify({
        username: values.username,
        password: values.password
      })
    }

    try {
      const res = await API(config)
      res.data.user.expiresAt = expireDate
      this.setUserToLocalStorage(res.data.user)
      return true
    } catch(err) {
      console.log(err.toString())
      return false
    }
  }

  signOut() {
    localStorage.clear();
    return true
  }

  setUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return JSON.parse(user)
  }
}

const authClient = new Auth();

export default authClient