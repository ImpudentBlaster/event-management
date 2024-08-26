
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'
import { Button, Flex } from 'antd';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const creatorEmail = sessionStorage.getItem('creatorEmail')

function Profile() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:5000/findUser/${creatorEmail}`)
                .then(res => setUserData(res.data))
                .catch(err => console.log(err))
        }
        fetchData()
    }, [])
    function handleLogout () {
        console.log(userData)
        sessionStorage.removeItem('creatorEmail')
        navigate('/login')
    }
    return (
        <>
            <div className='profile-card-main'>
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
            </div>
        </>
    )

}
export default Profile;