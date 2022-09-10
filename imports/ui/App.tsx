import React from 'react'
import { Meteor } from 'meteor/meteor'
import LoginScreen from './screens/LoginScreen'
import { useTracker } from 'meteor/react-meteor-data'

export const App = () => {
  const user = useTracker(() => Meteor.user())

  return (
    <div className="app">
      <header className="app-bar">
        <h1>Appointments</h1>
      </header>

      <div className="main">
        {user ? <h1>Welcome {user.username}</h1> : <LoginScreen />}
      </div>
    </div>
  )
}
