import React, { useState ,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios'

 function EventUpdate() {
    const location = useLocation()
    const [event, setEvent] = useState(location.state.data)
    const navigate = useNavigate()

useEffect(()=>{
    if(!localStorage.getItem('creatorEmail'))
        navigate('/')
},[])

  async  function handleSubmission() {
    let temp = {
        title: event.title.trim(),
        description: event.description.trim(),
        time: event.time.trim(),
        date: event.date.trim(),
        location: event.location.trim(),
      }
      setEvent(temp)
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
            navigate('/Homepage')
            
           })
           .catch(err => console.log(err))
        }


    }
    return (
        <div className='event-creator-main flex flex-col gap-6'>
            <div className='event-creator-heading mt-2'>
                <h2 className='text-2xl font-bold'>Update Event</h2>
            </div>

            <div className='w-full sm:w-5/12 md:w-6/12 lg:w-5/12 flex flex-col gap-6'>
                <div className='event-creator-inputs flex gap-4 items-center justify-between'>
                    <p className='font-semibold'>Title</p>
                    <input onChange={(e) => setEvent({ ...event, title: e.target.value})} value={event.title}></input>
                </div>
                <div className='event-creator-inputs flex gap-4 items-center justify-between'>
                    <p className='font-semibold'>Description</p>
                    <input onChange={(e) => setEvent({ ...event, description: e.target.value})} value={event.description}></input>
                </div>
                <div className='event-creator-inputs flex gap-4 items-center justify-between'>
                    <p className='font-semibold'>Date</p>
                    <input onChange={(e) => setEvent({ ...event, date: e.target.value})} type='date' value={event.date}></input>
                </div>
                <div className='event-creator-inputs flex gap-4 items-center justify-between'>
                    <p className='font-semibold'>Time</p>
                    <input onChange={(e) => setEvent({ ...event, time: e.target.value})} type='time' value={event.time}></input>
                </div>
                <div className='event-creator-inputs flex gap-4 items-center justify-between'>
                    <p className='font-semibold'>Location</p>
                    <input onChange={(e) => setEvent({ ...event, location: e.target.value})} value={event.location}></input>
                </div>
            </div>
            <div className='event-creator-button'>
            <button className='border border-3 border-black px-4 py-2 hover:text-white hover:bg-black' onClick={handleSubmission}>Update Event</button>
            </div>
        </div>
    )
}

export default EventUpdate