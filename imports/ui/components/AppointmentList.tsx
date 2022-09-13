import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { Appointment, Appointments } from '/imports/db/Appointments'
import './AppointmentList.styles.css'

export type AppointmentListProps = {
  handleItemSelected: (appointment: Appointment) => void
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  handleItemSelected,
}) => {
  const myAppointments: Appointment[] = useTracker(() => {
    if (!Meteor.user()) {
      console.error('Fetching appointments without logged user')
      return []
    }

    // TODO: Handle loading state
    Meteor.subscribe('appointments')

    return Appointments.find({}, { sort: { date: 1 } }).fetch()
  })

  // TODO: extract item to component
  return (
    <div className="appointment-list">
      <label>My appointments:</label>
      {myAppointments.map((appointment: Appointment) => {
        const fullName = `${appointment.firstName} ${appointment.lastName}`

        return (
          <div
            className="list-item"
            key={appointment._id}
            onClick={() => handleItemSelected(appointment)}
            title={fullName}
          >
            <div>{fullName}</div>
            <div>{appointment.date.toDateString()}</div>
          </div>
        )
      })}
    </div>
  )
}
