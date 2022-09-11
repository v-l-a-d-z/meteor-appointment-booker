import { Meteor } from 'meteor/meteor'
import { Appointments } from '../db/Appointments'

Meteor.publish('appointments', function publishAppointments() {
  if (!this.userId) {
    // TODO: error handling
    console.error(
      'tried to access appointments publications without logged user!'
    )
    return
  }

  return Appointments.find({ userId: this.userId })
})
