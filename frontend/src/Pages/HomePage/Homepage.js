import React, { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd';

import { Avatar, Badge, Space, Switch } from 'antd';
import axios from 'axios'
import './Homepage.css'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';


function Homepage() {

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [invitation ,setInvitation] = useState([])
  const navigate = useNavigate()
  const [eventData, setEventData] = useState("")
  const creatorEmail = sessionStorage.getItem('creatorEmail')

  useEffect(() => {
    const fetchData = async () => {
      const array = []
      await axios.get('http://localhost:5000/showEvent')
        .then(res =>{ 
         res.data.map(item => {
          if(item.invited.includes(creatorEmail))
            array.push(item)
        setInvitation(array)
      })
      let temp = []
      res.data.map(item =>{
        if(item.created_by === creatorEmail || item.invited.includes(creatorEmail))
        {
          temp.push(item)
        }
      })
      setEventData(temp)
      console.log(temp)
          })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [])

function handleAccept (data) {
  console.log(data)
  let temp = invitation.filter(item => item._id !== data._id)
  setInvitation(temp)
}

  function handleUpdate(data) {
    console.log(data)
    navigate('/UpdateEvent', { state: { data } })
  }

  function handleClick(data) {
    const creatorEmail = sessionStorage.getItem('creatorEmail')

    if (creatorEmail === data.created_by)
      navigate('/EventDetails', { state: data })
  }

  async function handleDelete(data) {
    let temp = eventData.filter(item => item._id !== data._id)
    setEventData(temp)
    await axios.post(`http://localhost:5000/deleteEvent/${data._id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
  }
  return (
    <>
    <h2 className='homepage-h2'> HomePage
<div className='homepage-drawer' style={{padding:0}}>
      <Button shape='square' className='ant-design-button' onClick={showDrawer}>
        <Space size="large">
          <Badge color='black' dot={invitation.length === 0 ? false : true}>
            <Avatar shape="square" size="large" >Invites</Avatar>
          </Badge>
        </Space>
      </Button>
      <Drawer title="Invites" onClose={onClose} open={open}>
        {
          invitation.map((item )=>{
            return <>
             <p style={{ padding:"1rem" , boxShadow:"0 0 2px 2px rgba(0 ,0 ,0 ,0.3)"}}>Invite from {item.created_by}<br/> <button onClick={()=>handleAccept(item)}>Accept</button></p>
            </>
          })
        }
       
      </Drawer>
</div>
</h2>
        
      <div className='homepage-main'>


        {eventData.length === 0 ? <h4>No invites</h4> : eventData.map((item ,index)=> {
          return (
            <>
              <div key={index} className='homepage-invite-card-main' onClick={() => handleClick(item)}>
                <p>Sender : {item.created_by}</p>
                <p>Desc : {item.description}</p>
                {creatorEmail === item.created_by ? <p onClick={() => handleDelete(item)}>❌</p> : ""}
                {creatorEmail === item.created_by ? <button onClick={() => handleUpdate(item)}>Update</button> : ""}
              </div>
            </>
          )
        })}

      </div>
    </>


  )
}

export default Homepage
