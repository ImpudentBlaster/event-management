import React from 'react'
import './Sidebar.css'
import { SlCalender } from "react-icons/sl";
import { IoIosCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router';
import Profile from '../../Pages/Profile/Profile';

function Sidebar() {

    const navigate = useNavigate()
    function handleClick(choice){
        if(choice === 'home') navigate('/')
            if(choice === 'create-events')navigate('/CreateEvent')
                if(choice === 'profile')navigate('/Profile')
    }

    return (
        <div className='sidebar-main'>
            <div className='sidebar-main-sec-1'>
                <div className='sidebar-top-icon'>
                    <p onClick={()=>handleClick("profile")}><FaUser /></p>
                </div>
            </div>
            <div className='sidebar-main-sec-2'>
                <div className='sidebar-icon-1' onClick={()=>handleClick("home")}><p ><SlCalender /></p></div>
                <div className='sidebar-icon-2'  onClick={()=>handleClick("create-events")}><p><IoIosCreate /></p></div>
            </div>
        </div>
    )
}

export default Sidebar