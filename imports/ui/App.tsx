import React from 'react'
import { Meteor } from 'meteor/meteor'
import LoginScreen from './screens/LoginScreen'
import { useTracker } from 'meteor/react-meteor-data'
import { UserBadge } from './components/UserBadge'
import { HomeScreen } from './screens/HomeScreen'
import { strings } from './localization/strings'

export const App = () => {
  const user = useTracker(() => Meteor.user())

  return (
    <div className="app">
      <header className="app-bar">
        <h1>{strings.appTitle}</h1>
        <UserBadge user={user} />
      </header>
      <div className="main">{user ? <HomeScreen /> : <LoginScreen />}</div>
    </div>
  )
}
