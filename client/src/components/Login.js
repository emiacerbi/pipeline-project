import React, { useState } from 'react'
import { blogServices } from '../services/blogs'
import { loginServices } from '../services/login'
import { Notification } from './Notification'

const Login = ({ setUser, setMessage, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e, setState) => {
    setState(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginServices.login({ username, password })
      setUser(response)
      blogServices.setToken(response.token)
      window.localStorage.setItem('blogListUser', JSON.stringify(response))

      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({
        text: 'Wrong credentials',
        isError: true,
      })
    } finally {
      setTimeout(() => {
        setMessage({
          text: '',
          isError: false,
        })
      }, 3000)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>

      <Notification message={message} />

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id="username" onChange={(e) => handleChange(e, setUsername)} />
        </div>
        <div>
          password
          <input id="password" onChange={(e) => handleChange(e, setPassword)} />
        </div>

        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
