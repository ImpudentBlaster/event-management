import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios'

 function EventUpdate() {
    const location = useLocation()
    const [event, setEvent] = useState(location.state.data)
    const navigate = useNavigate()

  async  function handleSubmission() {
        let empty = Object.values(event).some(val => val === "")
        if (empty) {
            alert("All input fields are required");
            return;
        }
        if (!empty) {

           await axios.post(`http://localhost:5000/updateEvent/${event._id}`,{
            event
           })
           .then(res => {
            console.log(res)
            navigate('/')
            
           })
           .catch(err => console.log(err))
        }


    }
    return (
        <div className='event-creator-main'>
            <div className='event-creator-heading'>
                <h2>Update the event</h2>
            </div>

            <div className='event-creator-inputs-main'>
                <div className='event-creator-inputs'>
                    <p>Title</p>
                    <input onChange={(e) => setEvent({ ...event, title: e.target.value.trim() })} value={event.title}></input>
                </div>
                <div className='event-creator-inputs'>
                    <p>Description</p>
                    <input onChange={(e) => setEvent({ ...event, description: e.target.value.trim() })} value={event.description}></input>
                </div>
                <div className='event-creator-inputs'>
                    <p>Date</p>
                    <input onChange={(e) => setEvent({ ...event, date: e.target.value.trim() })} type='date' value={event.date}></input>
                </div>
                <div className='event-creator-inputs'>
                    <p>Time</p>
                    <input onChange={(e) => setEvent({ ...event, time: e.target.value.trim() })} type='time' value={event.time}></input>
                </div>
                <div className='event-creator-inputs'>
                    <p>Location</p>
                    <input onChange={(e) => setEvent({ ...event, location: e.target.value.trim() })} value={event.location}></input>
                </div>
            </div>
            <div className='event-creator-button'>
                <button onClick={() => handleSubmission()}>Update</button>
            </div>
        </div>
    )
}

export default EventUpdate