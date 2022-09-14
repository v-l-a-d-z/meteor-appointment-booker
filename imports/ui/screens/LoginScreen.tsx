import { Meteor } from 'meteor/meteor'
import React, { FormEvent, useState } from 'react'
import { strings } from '../localization/strings'
import './LoginScreen.styles.css'

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  const submit = (e: FormEvent) => {
    e.preventDefault()

    Meteor.loginWithPassword(username, password, () => {
      setError(strings.loginFailed)
    })
  }

  return (
    <form onSubmit={submit} className="login-form">
      <div className="login-controls">
        <input
          type="text"
          placeholder={strings.inputPlaceholderUsername}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder={strings.inputPlaceholderPassword}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{strings.logIn}</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default LoginScreen
