import React from 'react'
import { Meteor } from 'meteor/meteor'
import LoginScreen from './screens/LoginScreen'
import { useTracker } from 'meteor/react-meteor-data'

export const App = () => {
  const user = useTracker(() => Meteor.user())
  const logout = () => Meteor.logout()

  const userBadge = (
    <div className="user-badge">
      {user ? (
        <>
          {user.username}
          <button onClick={logout}>|→</button>
        </>
      ) : (
        <>sign in</>
      )}
    </div>
  )

  return (
    <div className="app">
      <header className="app-bar">
        <h1>Appointments</h1>
        {userBadge}
      </header>
      <div className="main">
        {user ? <h1>Welcome {user.username}</h1> : <LoginScreen />}
      </div>
    </div>
  )
}
