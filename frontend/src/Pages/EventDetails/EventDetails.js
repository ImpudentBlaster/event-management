import React ,{useEffect}from 'react'
import './EventDetails.css'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'

function EventDetails() {
  const navigate = useNavigate()
    const location = useLocation()
    const {state} = location

    useEffect(()=>{
      if(!localStorage.getItem('creatorEmail'))
      navigate('/')
    },[])
  return (
    <div className='event-details-main flex flex-col gap-4 w-full  sm:w-6/12'>
        <h2 className='m-0 text-3xl font-semibold'>Event Details</h2>
        <p className='m-0 text-lg font-semibold flex justify-between'>Title :<span className='font-normal'>{state.title}</span></p>
        <p className='m-0 text-lg font-semibold flex justify-between'>Description : <span className='font-normal'>{state.description}</span> </p>
        <p className='m-0 text-lg font-semibold flex justify-between'>Time : <span className='font-normal'>{state.time}</span></p>
        <p className='m-0 text-lg font-semibold flex justify-between'>Date : <span className='font-normal'>{state.date}</span></p>
        <p className='m-0 text-lg font-semibold flex justify-between'>Location : <span className='font-normal'>{state.location}</span></p>
        <ul className='font-semibold text-lg flex flex-col'>Invited :
        {state.invited.map(item =>{
            return (
                <>
                <li className='font-normal text-base text-right'>{item}</li>
                </>
            )
        })}
        </ul>
    </div>
  )
}

export default EventDetails