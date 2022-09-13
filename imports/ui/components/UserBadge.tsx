import React from 'react'
import { Meteor } from 'meteor/meteor'
import './UserBadge.styles.css'
import { strings } from '../localization/strings'

export type UserBadgeProps = {
  user: Meteor.User | null
}

export const UserBadge: React.FC<UserBadgeProps> = ({ user }) => {
  const logout = () => Meteor.logout()

  return (
    <div className="user-badge">
      {user ? (
        <>
          {user.username}
          <button onClick={logout}>|→</button>
        </>
      ) : (
        <>{strings.signIn}</>
      )}
    </div>
  )
}
