import React, { useRef ,useState} from 'react'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const email = useRef(null)
    const password = useRef(null)
    const [userData, setUserdata] = useState({
        email: "", password: "",
     })


    async function handleClick() {
        console.log(userData)

        email.current.textContent = ""
        password.current.textContent = ""
  
        const empty = Object.values(userData).some(val => val === "")
        if (empty) {
           alert("Fill all the fields")
        }
  
        if (!empty) {
         await axios.post('http://localhost:5000/login' , {
           email:userData.email , password:userData.password , username:userData.username
          }).then(res =>{
      
            sessionStorage.setItem('creatorEmail' , res.data.email)
           
            navigate('/')
            setUserdata({email:"" , password:""})
            
          }).catch(err =>{
            email.current.textContent = err.response.data.email;
            password.current.textContent = err.response.data.password
          })
        }
     }

    return (
        <>
            <div className='login-main'>
                <div className='login-box'>
                    <p>Login Here</p>
                    <p >New here? <span onClick={()=>navigate('/signup')} style={{borderBottom:"1px solid black" , cursor:"pointer"}}>Sign up</span></p>
                    <div className='login-box-inputs'>
                        <p>Email <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "2rem" }} ref={email}></span></p>
                        <input value={userData.email} placeholder='Enter email' onChange={(event)=>{
                            let data = event.target.value.trim()
                            setUserdata({...userData , email:data})
                        }}></input>
                        
                    </div>
                    <div className='login-box-inputs'>
                        <p>Password  <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "2rem" }} ref={password}></span></p>
                        <input value={userData.password} placeholder='Enter password' onChange={(event)=>{
                            let data = event.target.value.trim()
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