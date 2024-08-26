import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup'
import DrawerComponent from './Components/Drawer/Drawer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
{/* <DrawerComponent/> */}
{/* <Login/>
<Signup/> */}
{/* <EventSender/> */}
<Router/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

