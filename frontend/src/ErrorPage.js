import React from 'react'
import { useNavigate } from 'react-router'

function ErrorPage() {
    const navigate = useNavigate()
  return (
    <>
    <h1 className='text-xl'>Error 404 , This route is not defined</h1>
    <span onClick={()=>navigate('/Homepage')} className='text-blue-500 cursor-pointer'>Go to Homepage</span>
    </>
  )
}

export default ErrorPage