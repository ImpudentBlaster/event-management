import React ,{useState,useEffect}from 'react'
import './Sidebar.css'
import { SlCalender } from "react-icons/sl";
import { IoIosCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router';
import Profile from '../../Pages/Profile/Profile';

function Sidebar() {
    const location = useLocation()
    
    useEffect(()=>{
      if(location.pathname === '/Homepage')
        setActive({profile : false , home : true , create:false})
 if (location.pathname === '/CreateEvent')
        setActive({profile:false , home:false , create:true})
    if(location.pathname === '/Profile')
        setActive({profile:true , home :false , create:false})
    },[location.pathname])
const [active , setActive] = useState({
    profile : false , home : false , create:false
})
    const navigate = useNavigate()
    function handleClick(choice){
        if(choice === 'home') 
            {
                navigate('/Homepage')}
            if(choice === 'create-events')
            {
                navigate('/CreateEvent')
            }
                if(choice === 'profile')
                    {
                        navigate('/Profile')
                    }
                        
    }

    return (
        <div className='sidebar-main'>
            <div className='sidebar-main-sec-1'>
                <div className={`${active.profile ? "sidebar-icon-active" : "sidebar-icon-1-hover cursor-pointer"}`}>
                    <p onClick={()=>handleClick("profile")}><FaUser /></p>
                </div>
            </div>
            <div className='sidebar-main-sec-2'>
                <div className={`${active.home ? "sidebar-icon-active" : "sidebar-icon-1-hover cursor-pointer"}`} onClick={()=>handleClick("home")}><p ><SlCalender /></p></div>
                <div className={`${active.create ? "sidebar-icon-active" : "sidebar-icon-1-hover cursor-pointer"}`} onClick={()=>handleClick("create-events")}><p><IoIosCreate /></p></div>
            </div>
        </div>
    )
}

export default Sidebar