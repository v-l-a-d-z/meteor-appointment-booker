import React from 'react'
import { Meteor } from 'meteor/meteor'

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
        <>sign in</>
      )}
    </div>
  )
}
