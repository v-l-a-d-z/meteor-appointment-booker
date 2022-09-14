import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { Meteor } from 'meteor/meteor'
import './AppointmentForm.styles.css'
import {
  Appointment,
  AppointmentInsert,
} from '/imports/common/types/Appointment'
import { getDateString } from '/imports/helpers/DateHelper'
import { strings } from '/imports/ui/localization/strings'

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

  const title = isEditing ? strings.editTitle : strings.createTitle

  useEffect(() => {
    if (!selectedAppointment) {
      return
    }

    setIsEditing(true)
    setFirstName(selectedAppointment.firstName)
    setLastName(selectedAppointment.lastName)
    setDateString(selectedAppointment.date.toISOString().substring(0, 10))
  }, [selectedAppointment])

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setError(undefined)

      const date = new Date(dateString)

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
            if (error) {
              setError(strings.operationFailed + error.message)
            }
          }
        )
      } else {
        const appointmentInsert: AppointmentInsert = {
          firstName,
          lastName,
          date,
        }

        Meteor.call(
          'appointments.insert',
          appointmentInsert,
          (error: Meteor.Error) => {
            if (error) {
              setError(strings.operationFailed + error.message)
            }
          }
        )
      }

      // TODO: display success message to user
      // TODO: only clear the form when there is no error
      clearForm()
    },
    [isEditing, dateString, selectedAppointment, firstName, lastName]
  )

  const clearForm = useCallback(() => {
    setError(undefined)
    setFirstName('')
    setLastName('')
    setDateString('')
    setIsEditing(false)
    clearSelectedAppoitnment()
  }, [clearSelectedAppoitnment])

  // TODO: nice to have: disable past dates in date picker
  return (
    <form onSubmit={submit} className="appointment-form">
      <label>{title}</label>
      <input
        type="text"
        placeholder={strings.inputPlaceholderFirstName}
        value={firstName}
        name="username"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder={strings.inputPlaceholderLastName}
        value={lastName}
        name="username"
        required
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type={'date'}
        name={'date'}
        min={getDateString(new Date())}
        value={dateString}
        required
        onChange={(e) => setDateString(e.target.value.substring(0, 10))}
      />

      <div className="create-control">
        <button type="button" onClick={clearForm}>
          {strings.cancel}
        </button>
        <button type="submit" disabled={!firstName || !lastName || !dateString}>
          {strings.save}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
