import React, { useState } from 'react'
import { AppointmentForm } from '../components/AppointmentForm'
import { AppointmentList } from '../components/AppointmentList'
import './HomeScreen.styles.css'
import { Appointment } from '/imports/db/Appointments'

export const HomeScreen: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>()

  const handleItemSelected = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
  }

  const clearSelectedAppoitnment = () => {
    setSelectedAppointment(undefined)
  }

  return (
    <div className="homescreen">
      <AppointmentForm />
      <AppointmentList handleItemSelected={handleItemSelected} />
    </div>
  )
}
