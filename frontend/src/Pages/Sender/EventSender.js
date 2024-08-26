import React, { useEffect, useRef, useState } from 'react'
import './EventSender.css'
import axios from 'axios'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom';
let invited ;
function EventSender() {
    const [email, setEmail] = useState()
    const [userData, setUserData] = useState("")
    const [list, setList] = useState([])
    
    const mark = useRef(null)
    const location = useLocation()
    const { eventData } = location.state
    const [show,setShow] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get('http://localhost:5000/showUser')
            setUserData(response.data)
        }
        fetchData()
    }, [])

    function handleClick() {
     
        let array = []
        userData.map(item => {
            console.log(item.email.startsWith(email))
            if (item.email.startsWith(email))
                array.push(item)

        })
console.log(array)
        setList(array)
    }
   async function handleSelection(data) {
    
    invited = data.email
    }

  async  function handleSubmission () {
    console.log(eventData)
   await axios.post('http://localhost:5000/createEvent' , {
        title:eventData.title , description:eventData.description , time:eventData.time , date:eventData.date , location:eventData.location , invited:invited
    }).then(res =>{
        console.log(res)
        setList([])
        navigate('/')
    }).catch(err =>{
        console.log(err)
    })
    }
    return (
        <>
            {/* <div className='event-sender-main'>
                <div className='event-sender-box'>
                    <div>
                        <input value={email} placeholder='Enter the email' onChange={(event) => {
                            setEmail(event.target.value.trim())
                        }} ></input> <button onClick={() => handleChange()}>🔍</button>
                    </div>

                    <div className='event-sender-emails-box'>
                        <ul>
                            {
                                list.length === 0 ? <p>Search for people</p> : list.map(item => {
                                    return (
                                        <>

                                            <li ><p>Username : {item.username}</p></li>
                                            <li><p>Email : {item.email}</p></li>
                                            <br></br>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
<button>Hello</button>
                </div>
            </div> */}

            <div className='eventSender-main'>
                <div className='eventSender-inputs'>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter the email'></input><button onClick={()=>handleClick()}>Search</button>
                </div>
                <div className='eventSender-content'>
                    {
                        list.length === 0 ? <p>Search for emails</p> : list.map(item => {
                            return <>
                           
                                <p> <span ref={mark} onClick={() =>handleSelection(item)}>☑️</span>{item.email}</p>
                            </>
                        })
                    }
                </div>
                <button onClick={()=>handleSubmission()}>Create</button>
            </div>
        </>
    )
}

export default EventSender