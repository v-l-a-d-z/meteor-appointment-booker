import React from 'react'
import { AppointmentForm } from '../components/AppointmentForm'
import { AppointmentList } from '../components/AppointmentList'
import './HomeScreen.styles.css'

export const HomeScreen: React.FC = () => (
  <div className="homescreen">
    <AppointmentForm />
    <AppointmentList />
  </div>
)
