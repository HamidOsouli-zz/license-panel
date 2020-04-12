import http from './http';
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
    const user = this.getUserFromLocalStorage();
    return user.username;
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
    const expireDate = nowDate.setHours(hour + 1);
    try {
      const res = await http.post("/user/login", JSON.stringify({
        username: values.username,
        password: values.password
      }));
      this.setUserToLocalStorage({...res.data, expiresAt: expireDate});
      return true;
    } catch (e) {
      return false;
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