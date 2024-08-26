import React from 'react'
import './EventDetails.css'
import { useLocation } from 'react-router'

function EventDetails() {
    const location = useLocation()
    const {state} = location
  return (
    <div className='event-details-main'>
        <h2>EVENT DETAILS</h2>
        <p>Title :{state.title}</p>
        <p>Description : {state.description}</p>
        <p>Time : {state.time}</p>
        <p>Date : {state.date}</p>
        <p>Location : {state.location}</p>
        <ul>Invited :
        {state.invited.map(item =>{
            return (
                <>
                <li>{item}</li>
                </>
            )
        })}
        </ul>
    </div>
  )
}

export default EventDetails