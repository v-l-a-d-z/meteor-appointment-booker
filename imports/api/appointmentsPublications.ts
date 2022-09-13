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

  // TODO: Discuss - Return only upcoming appointments? How to handle past appointments?
  return Appointments.find({ userId: this.userId })
})
