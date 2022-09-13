import { Meteor } from 'meteor/meteor'
import React, { FormEvent, useState } from 'react'
import './LoginScreen.styles.css'

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  const submit = (e: FormEvent) => {
    e.preventDefault()

    Meteor.loginWithPassword(username, password, () => {
      setError('Login failed. Please check your username and password.')
    })
  }

  return (
    <form onSubmit={submit} className="login-form">
      <div className="login-controls">
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default LoginScreen
