import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import '/imports/api/appointmentsMethods'
import '/imports/api/appointmentsPublications'

const SEED_USERNAME1 = 'testuser1'
const SEED_PASSWORD1 = 'pass'

const SEED_USERNAME2 = 'testuser2'
const SEED_PASSWORD2 = 'word'

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME1)) {
    Accounts.createUser({
      username: SEED_USERNAME1,
      password: SEED_PASSWORD1,
    })
  }

  if (!Accounts.findUserByUsername(SEED_USERNAME2)) {
    Accounts.createUser({
      username: SEED_USERNAME2,
      password: SEED_PASSWORD2,
    })
  }
})
