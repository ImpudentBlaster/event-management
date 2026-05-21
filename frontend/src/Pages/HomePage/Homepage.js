import React, { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd';
import { Avatar, Badge, Space } from 'antd';
import axios from 'axios'
import './Homepage.css'
import { useNavigate } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

function Homepage() {
  const creatorName = localStorage.getItem('creatorName')
  const [username, setUsername] = useState("")
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [invitation, setInvitation] = useState([])
  const navigate = useNavigate()
  const [eventData, setEventData] = useState("")
  const creatorEmail = localStorage.getItem('creatorEmail')

  useEffect(() => {
    if (!creatorEmail) navigate('/')
  }, [])

  useEffect(() => {
    setUsername(creatorName)
    const fetchData = async () => {
      const array = []
      await axios.get('http://localhost:5000/showEvent')
        .then(res => {
          res.data.map(item => {
            if (item.invited.includes(creatorEmail))
              array.push(item)
            setInvitation(array)
          })
          let temp = []
          res.data.map(item => {
            if (item.created_by === creatorEmail || item.invited.includes(creatorEmail)) {
              temp.push(item)
            }
          })
          setEventData(temp)

        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [])

  function handleAccept(data) {
    console.log(data)
    let temp = invitation.filter(item => item._id !== data._id)
    setInvitation(temp)
  }

  function handleUpdate(data) {
    console.log(data)
    navigate('/UpdateEvent', { state: { data } })
  }

  function handleClick(data) {
    const creatorEmail = localStorage.getItem('creatorEmail')

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
      <h2 className='homepage-h2 capitalize'> Welcome {username}
        <div className='homepage-drawer' style={{ padding: 0 }}>
          <Button shape='square' className='ant-design-button' onClick={showDrawer}>
            <Space size="large">
              <Badge color='black' dot={invitation.length === 0 ? false : true}>
                <Avatar shape="square" size="large" >Invites</Avatar>
              </Badge>
            </Space>
          </Button>
          <Drawer title="Invites" onClose={onClose} open={open}>
            {
              invitation.length === 0 ? <p>No Invites</p> :
                invitation.map((item) => {
                  return <>
                    <p className=' p-4 mb-4 shadow-md' >Invite from {item.created_by}<br /> <button className='bg-slate-100 mt-2 px-4 py-1 hover:text-white hover:bg-slate-900 rounded-md' onClick={() => handleAccept(item)}>Accept</button></p>
                  </>
                })
            }

          </Drawer>
        </div>
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 '>


        {eventData.length === 0 ? <h4>No invites</h4> : eventData.map((item, index) => {
          return (
            <>
              {
                item.created_by === creatorEmail ? <>
                  <div key={index} className="homepage-invite-card-main rounded-2xl p-6 flex flex-col gap-4 bg-slate-100 justify-center " >
                    <div className="invite-card-text "  >
                      <p className='font-bold flex gap-4  flex justify-between'> <span onClick={() => handleClick(item)} className='cursor-pointer'>Title : <span className='font-normal '>{item.title}</span></span>  <span className='flex gap-4 text-lg '><MdDelete onClick={()=>handleDelete(item)} className='cursor-pointer hover:text-red-500' /> <GrUpdate onClick={()=>handleUpdate(item)} className='cursor-pointer hover:text-green-500' /></span>  </p>
                      <p onClick={() => handleClick(item)} className='font-bold flex gap-4 cursor-pointer '>Sender :<span className='font-normal'>{item.created_by}</span>  </p>
                      <p onClick={() => handleClick(item)} className='font-bold flex gap-4 cursor-pointer '>Description :<span className='font-normal'>{item.description}</span>  </p>
                      <p onClick={() => handleClick(item)} className='font-bold flex gap-4 cursor-pointer '>Date :<span className='font-normal'>{item.date}</span>  </p>
                      <p onClick={() => handleClick(item)} className='font-bold flex gap-4 cursor-pointer '>Timings :<span className='font-normal'>{item.time}</span>  </p>
                      {item.location.includes("http" || ".com") ? <p className='font-bold flex gap-4 '>Meeting Link :<span className='font-normal'><a target='_blank' className='text-blue-500 hover:text-blue-700' href={item.location}>Click Here</a></span>  </p> : <p className='font-bold flex gap-4 '>Location :<span className='font-normal'>{item.location}</span>  </p>}
                    </div>
                  </div>
                </> : <>
                  <div key={index} className="homepage-invite-card-main rounded-2xl p-6 flex flex-col gap-4 justify-center bg-slate-100 " >
                    <div className="invite-card-text">
                      <p className='font-bold flex gap-4'>Title : <span className='font-normal '>{item.title}</span> </p>
                      <p className='font-bold flex gap-4 '>Sender :<span className='font-normal'>{item.created_by}</span>  </p>
                      <p className='font-bold flex gap-4 '>Description :<span className='font-normal'>{item.description}</span>  </p>
                      <p className='font-bold flex gap-4 '>Date :<span className='font-normal'>{item.date}</span>  </p>
                      <p className='font-bold flex gap-4 '>Timings :<span className='font-normal'>{item.time}</span>  </p>
                      {item.location.includes("http" || ".com") ? <p className='font-bold flex gap-4 '>Meeting Link :<span className='font-normal'><a target='_blank' className='text-blue-500 hover:text-blue-700' href={item.location}>Click Here</a></span>  </p> : <p className='font-bold flex gap-4 '>Location :<span className='font-normal'>{item.location}</span>  </p>}
                    </div>


                  </div></>
              }
            </>
          )
        })}

      </div>
    </>


  )
}

export default Homepage
