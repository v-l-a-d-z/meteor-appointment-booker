import { Meteor } from 'meteor/meteor'
import { Appointments } from '../db/Appointments'

Meteor.methods({
  'appointments.insert'(firstName: string, lastName: string, date: Date) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized to insert appointment.')
    }

    Appointments.insert({
      firstName,
      lastName,
      date,
      userId: this.userId,
    })
  },
})
