import React, { FormEvent, useEffect, useState } from 'react'
import { Meteor } from 'meteor/meteor'
import './AppointmentForm.styles.css'
import { Appointment } from '/imports/db/Appointments'

export type AppointmentProps = {
  selectedAppointment?: Appointment
  clearSelectedAppoitnment: () => void
}

export const AppointmentForm: React.FC<AppointmentProps> = ({
  selectedAppointment,
  clearSelectedAppoitnment,
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateString, setDateString] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string>()

  const title = isEditing ? 'Edit appointment' : 'Create appointment'

  useEffect(() => {
    if (!selectedAppointment) {
      return
    }

    setIsEditing(true)
    setFirstName(selectedAppointment.firstName)
    setLastName(selectedAppointment.lastName)
    setDateString(selectedAppointment.date.toISOString().substring(0, 10))
  }, [selectedAppointment])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setError(undefined)

    const date = new Date(dateString)
    if (date < new Date()) {
      // TODO: display error to user
      console.error('New appointment can not be in the past')
      return
    }

    if (isEditing && selectedAppointment) {
      // TODO: optimization: only trigger update when values changed
      const updatedAppointment: Appointment = {
        _id: selectedAppointment?._id,
        firstName,
        lastName,
        date,
        userId: selectedAppointment?.userId,
      }
      Meteor.call(
        'appointments.update',
        updatedAppointment,
        (error: Meteor.Error) => {
          setError('Operation failed: ' + error.message)
        }
      )
    } else {
      Meteor.call(
        'appointments.insert',
        firstName,
        lastName,
        date,
        (error: Meteor.Error) => {
          setError('Operation failed: ' + error.message)
        }
      )
    }

    // TODO: display success message to user
    // TODO: only clear the form when there is no error
    clearForm()
  }

  const clearForm = () => {
    setError(undefined)
    setFirstName('')
    setLastName('')
    setDateString('')
    setIsEditing(false)
    clearSelectedAppoitnment()
  }

  // TODO: nice to have: disable past dates in date picker
  return (
    <form onSubmit={submit} className="appointment-form">
      <label>{title}</label>
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        name="username"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        name="username"
        required
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type={'date'}
        name={'date'}
        value={dateString}
        required
        onChange={(e) => setDateString(e.target.value.substring(0, 10))}
      />

      <div className="create-control">
        <button type="button" onClick={clearForm}>
          Cancel
        </button>
        <button type="submit" disabled={!firstName || !lastName || !dateString}>
          Save
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
