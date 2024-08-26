import React, { useRef, useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router'
import axios from 'axios'


function Signup() {
   const email = useRef(null)
   const password = useRef(null)
   const navigate = useNavigate()
   const [userData, setUserdata] = useState({
      email: "", password: "", username: ""
   })

  async function handleClick() {

      email.current.textContent = ""
      password.current.textContent = ""

      const empty = Object.values(userData).some(val => val === "")
      if (empty) {
         alert("Fill all the fields")
      }

      if (!empty) {
       await axios.post('http://localhost:5000/signup' , {
         email:userData.email , password:userData.password , username:userData.username
        } , {withCredentials:true})
       .then(res =>{
        sessionStorage.setItem('creatorEmail' , res.data.email)
        sessionStorage.setItem('creatorId' , res.data._id)
         setUserdata({email:"" , password:"" ,username:""})
         navigate('/')
       }).catch(err =>{
         console.log(err.response.data)
         email.current.textContent = err.response.data.email;
         password.current.textContent = err.response.data.password;
       })
      }
   }

   return (
      <>
         <div className='signup-main'>
            <div className='signup-box'>
               <p>Signup Here</p>
               <p>Already a user? <span onClick={() => navigate('/login')} style={{ cursor: "pointer", borderBottom: "1px solid black" }}>Log in</span></p>
               <div className='signup-box-inputs'>
                  <p>Username</p>
                  <input value={userData.username} placeholder='Enter username' onChange={(event) => {
                     let data = event.target.value.trim()
                     setUserdata({ ...userData, username: data })
                  }}></input>
               </div>
               <div className='signup-box-inputs'>
                  <p>Email <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "2rem" }} ref={email}></span></p>
                  <input value={userData.email} placeholder='Enter email' onChange={(event) => {
                     let data = event.target.value.trim()
                     setUserdata({ ...userData, email: data })
                  }}></input>
               </div>
               <div className='signup-box-inputs'>
                  <p>Password <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "2rem" }} ref={password}></span></p>
                  <input value={userData.password} placeholder='Enter password' onChange={(event) => {
                     let data = event.target.value.trim()
                     setUserdata({ ...userData, password: data })
                  }}></input>
               </div>

               <div className='signup-box-button'>
                  <button onClick={() => handleClick()}>Sign Up</button>
               </div>
            </div>
         </div>
      </>
   )
}

export default Signup