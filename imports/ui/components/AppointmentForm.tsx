import React, { FormEvent, useState } from 'react'
import { Meteor } from 'meteor/meteor'
import './AppointmentForm.styles.css'

export const AppointmentForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateString, setDateString] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()

    const date = new Date(dateString)
    if (date < new Date()) {
      // TODO: display error to user
      console.error('New appointment can not be in the past')
      return
    }

    Meteor.call('appointments.insert', firstName, lastName, date)
    // TODO: display success message to user
    clearForm()
  }

  const clearForm = () => {
    setFirstName('')
    setLastName('')
    setDateString('')
  }

  // TODO: nice to have: disable past dates in date picker
  return (
    <form onSubmit={submit} className="appointment-form">
      <label>Create appointment:</label>
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
        onChange={(e) => setDateString(e.target.value)}
      />

      <div className="create-control">
        <button onClick={clearForm}>Cancel</button>
        <button type="submit" disabled={!firstName || !lastName || !dateString}>
          Create
        </button>
      </div>
    </form>
  )
}