import React, { useEffect, useRef ,useState} from 'react'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

function Login() {
    const [spin,setSpin] = useState(false)
    const navigate = useNavigate()
    const email = useRef(null)
    const password = useRef(null)
    const error  = useRef(null)
    const [userData, setUserdata] = useState({
        email: "", password: "",
     })

useEffect(()=>{
    if(localStorage.getItem('creatorEmail'))
        navigate('/Homepage')
},[])
    async function handleClick() {
        setSpin(true)
        let temp = {email:userData.email.trim() , password:userData.password.trim()}
        setUserdata(temp)

        email.current.textContent = ""
        password.current.textContent = ""
        error.current.textContent = ""
        error.current.style.display = "none"
  
        const empty = Object.values(userData).some(val => val === "")
        if(userData.email === "")
            {
                setSpin(false)
               email.current.textContent = "Email Required"
            }
            if(userData.password === "")
            {
                setSpin(false)
               password.current.textContent = "Please enter the password"
               return
            }
      
  
        if (!empty) {
         await axios.post('http://localhost:5000/login' , {
           email:userData.email , password:userData.password , username:userData.username
          },{withCredentials:true}).then(res =>{
             setSpin(false)
            localStorage.setItem('creatorEmail' , res.data.email)
            localStorage.setItem('creatorName' , res.data.username)
            localStorage.setItem('creatorId' , res.data._id)
           
            navigate('/Homepage')
            setUserdata({email:"" , password:""})
            
          }).catch(err =>{
              setSpin(false)
              error.current.style.display = "block"
            error.current.textContent = "Invalid email or password"
          })
        }
     }

    return (
        <>
        {spin && <Spin spinning={spin} fullscreen/>}
      
            <div className='login-main'>
                <div className='login-box'>
                    <p>Login Here</p>
                    <p >New here? <span onClick={()=>navigate('/signup')} style={{borderBottom:"1px solid black" , cursor:"pointer"}}>Sign up</span></p>
                    <span style={{ color: "red", fontSize: "0.85rem" , display:"none" }} ref={error}></span>
                    <div className='login-box-inputs'>
                        <p>Email <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "2rem" }} ref={email}></span></p>
                        <input value={userData.email} placeholder='Enter email' onChange={(event)=>{
                            let data = event.target.value
                            error.current.style.display = "none"
                            setUserdata({...userData , email:data})
                        }}></input>
                        
                    </div>
                    <div className='login-box-inputs'>
                        <p>Password  <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "2rem" }} ref={password}></span></p>
                        <input value={userData.password} placeholder='Enter password' onChange={(event)=>{
                            let data = event.target.value
                            error.current.style.display = "none"
                            setUserdata({...userData , password:data})
                        }}></input>
                    </div>
                    <div className='login-box-button'>
                          <button onClick={()=>handleClick()}>Log in</button>
                    </div>
                </div>



            </div>
        </>
    )
}

export default Login