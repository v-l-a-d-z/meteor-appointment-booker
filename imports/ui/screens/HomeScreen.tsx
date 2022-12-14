import React, { useState } from 'react'
import { AppointmentForm } from '../components/AppointmentForm'
import { AppointmentList } from '../components/AppointmentList'
import './HomeScreen.styles.css'
import { Appointment } from '/imports/common/types/Appointment'

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
      <AppointmentForm
        selectedAppointment={selectedAppointment}
        clearSelectedAppoitnment={clearSelectedAppoitnment}
      />
      <AppointmentList handleItemSelected={handleItemSelected} />
    </div>
  )
}
