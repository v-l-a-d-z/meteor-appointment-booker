import { Mongo } from 'meteor/mongo'
import { Appointment } from '../common/types/Appointment'

export const Appointments = new Mongo.Collection<Appointment>('appointments')
