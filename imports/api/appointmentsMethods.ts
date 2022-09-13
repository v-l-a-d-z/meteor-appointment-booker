import { Meteor } from 'meteor/meteor'
import { Appointment, AppointmentInsert } from '../common/types/Appointment'
import { Appointments } from '../db/Appointments'

Meteor.methods({
  'appointments.insert'(appointment: AppointmentInsert) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized to insert appointment.')
    }

    Appointments.insert({
      ...appointment,
      userId: this.userId,
    })
  },

  'appointments.update'(appointment: Appointment) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized to update appointment.')
    }

    const { _id, firstName, lastName, date } = appointment
    const task = Appointments.findOne({ _id, userId: this.userId })

    if (!task) {
      throw new Meteor.Error('Access denied.')
    }

    // TODO: optimization: update only changed properties
    Appointments.update(_id, {
      $set: {
        firstName,
        lastName,
        date,
      },
    })
  },
})
