
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'
import { Button, Flex } from 'antd';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';


function Profile() {
    
        const navigate = useNavigate()
        const [userData, setUserData] = useState("")
    
    useEffect(()=>{
    const creatorEmail = localStorage.getItem('creatorEmail')
        if(!creatorEmail)
            navigate('/')
        else {
            const fetchData = async () =>{
                await axios.get(`http://localhost:5000/findUser/${creatorEmail}`)
                .then(res => setUserData(res.data))
                .catch(err => console.log(err))
            }
            fetchData()
        }
    },[])

  async  function handleLogout () {
        console.log(userData)
        localStorage.removeItem('creatorEmail')
        localStorage.removeItem('creatorName')
        localStorage.removeItem('creatorId')
        console.log(localStorage.getItem('creatorEmail'))
        navigate('/')
await axios.get('http://localhost:5000/logout' , {withCredentials:true})
.then(res =>console.log(res))
.catch(err => console.log(err))
    }
    return (
        <>
            {/* <div className='profile-card-main'>
                <Card
                    title="User Profile"
                    bordered={true}
                    style={{
                        width: 300,
                        border:"1px solid black"
                    }}
                >
                    {
                        userData.length === 0 ? <h2>Loading</h2> : <>
                            <p>{userData.username}</p>
                            <p>{userData.email}</p>
                            <Button onClick={() => handleLogout()}>Log Out</Button>
                        </>
                    }
                </Card>
            </div> */}
            <div className='profile-card-main shadow-xl flex flex-col items-center w-max p-8 gap-6'>
               <h2 className='text-3xl font-semibold'>User Profile</h2>
               <div className='profile-card-text'>
                        {userData.length === 0 ? <p>Loading</p> : <>
                        <p className='font-medium flex gap-4'>User id : <span className='font-normal '>{userData._id}</span></p>
                        <p className='font-medium flex gap-4'>Username : <span className='font-normal capitalize'>{userData.username}</span> </p>
                        <p className='font-medium flex gap-4'>Email : <span className='font-normal'>{userData.email}</span></p>
                        </>}
               </div>
               <button className='border border-3 border-black px-4 py-2 hover:text-white hover:bg-black' onClick={()=>handleLogout()}>Log Out</button>
            </div>
        </>
    )

}
export default Profile;