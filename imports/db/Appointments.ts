import { Mongo } from 'meteor/mongo'

export type Appointment = {
  _id: string
  firstName: string
  lastName: string
  date: Date
  userId: string
}

export const Appointments = new Mongo.Collection<Appointment>('appointments')
