import axios from 'axios'

export type loginFormFields = {
  email: string
  password: string
}

export type registerUserFormFields = {
  name: string
  email: string
  password: string
}

export class UserAPI {
  apiBaseUrl: string
  constructor() {
    this.apiBaseUrl = 'http://localhost:3333'
  }

  async login(form: loginFormFields): Promise<any> {
    try {
      const res = await axios.post(`${this.apiBaseUrl}/user/login`, {
        email: form.email,
        password: form.password,
      })

      return res.data
    } catch (error) {
      throw error
    }
  }

  async getUser(): Promise<any> {
    try {
      const jwtToken = localStorage.getItem('access-token')

      if (!jwtToken) {
        throw Error
      }

      const res = await axios.get(`${this.apiBaseUrl}/user/login/get-user`, {
        headers: {
          Authorization: jwtToken,
        },
      })

      return res.data
    } catch (error) {
      throw error
    }
  }

  async registerUser(form: registerUserFormFields): Promise<any> {
    try {
      const res = await axios.post(`${this.apiBaseUrl}/user`, {
        name: form.name,
        email: form.email,
        password: form.password,
      })

      return res.data
    } catch (error) {
      throw error
    }
  }
}
