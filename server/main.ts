import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import '/imports/api/appointmentsMethods'
import '/imports/api/appointmentsPublications'
import { Appointments } from '/imports/db/Appointments'

const SEED_USERNAME1 = 'testuser1'
const SEED_PASSWORD1 = 'pass'

const SEED_USERNAME2 = 'testuser2'
const SEED_PASSWORD2 = 'word'

const seedAppointments = (username: string, count = 20) => {
  const user = Accounts.findUserByUsername(username)
  if (!user) {
    return
  }

  const firstNames = ['Ross', 'Chandler', 'Joey', 'Monica', 'Phoebe', 'Rachel']
  const lastNames = ['Geller', 'Bing', 'Tribianni', 'Buffey', 'Green']

  if (Appointments.find({}).count() == 0) {
    for (let i = 0; i < count; i++) {
      Appointments.insert({
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        date: new Date(),
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        userId: user._id,
      })
    }
  }
}

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

  seedAppointments(SEED_USERNAME1)
})
