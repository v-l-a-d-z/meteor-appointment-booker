export type Appointment = {
  _id: string
  firstName: string
  lastName: string
  date: Date
  userId: string
}

export type AppointmentInsert = Pick<
  Appointment,
  'firstName' | 'lastName' | 'date'
>
