import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useCallback, useState } from 'react'
import { Appointments } from '/imports/db/Appointments'
import { Appointment } from '/imports/common/types/Appointment'
import './AppointmentList.styles.css'

export type AppointmentListProps = {
  handleItemSelected: (appointment: Appointment) => void
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  handleItemSelected,
}) => {
  const [searchPhrase, setSearchPhrase] = useState('')

  const myAppointments: Appointment[] = useTracker(() => {
    if (!Meteor.user()) {
      console.error('Fetching appointments without logged user')
      return []
    }

    // TODO: Handle loading state
    Meteor.subscribe('appointments')

    // TODO: Investigate - is this always fetching while searching or searching on a local collection?
    return Appointments.find(
      {
        $or: [
          {
            $where: `this.firstName?.toLowerCase().startsWith('${searchPhrase}')`,
          },
          {
            $where: `this.lastName?.toLowerCase().startsWith('${searchPhrase}')`,
          },
        ],
      },
      { sort: { date: 1 } }
    ).fetch()
  })

  const processSearchPhrase = useCallback(
    (searchString: string) => {
      const searchStringSanitized = searchString.toLowerCase().trimEnd()
      setSearchPhrase(searchStringSanitized)
    },
    [searchPhrase]
  )

  // TODO: extract item to component
  return (
    <div className="appointment-list">
      <label>My appointments:</label>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => processSearchPhrase(e.target.value)}
      />

      <div className="list-item-container">
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
    </div>
  )
}
