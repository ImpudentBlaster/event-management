import { createBrowserRouter , createRoutesFromElements , RouterProvider,Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import MainLayout from './Components/Mainlayout/MainLayout';
import Sidebar from './Components/Sidebar/Sidebar';
import Homepage from './Pages/HomePage/Homepage';
import EventCreator from './Pages/EventCreator/EventCreator';
import Signup from './Pages/SignUp/Signup';
import Login from './Pages/Login/Login';

import EventUpdate from './Pages/EventUpdate/EventUpdate';
import EventDetails from './Pages/EventDetails/EventDetails';
import Profile from './Pages/Profile/Profile';
import ErrorPage from './ErrorPage';



const router = createBrowserRouter(
    
    createRoutesFromElements(
        <>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/' element={<MainLayout/>}>
            <Route path='/Homepage' element={<Homepage/>}/>
            <Route path='/UpdateEvent' element={<EventUpdate/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path='/CreateEvent' element={<EventCreator/>}/>
            <Route path='/EventDetails' element={<EventDetails/>}/>
            
        </Route>
        </>
    )
)

const Router = () =>{
    return(
        <RouterProvider router={router}></RouterProvider>
    )
}

export default Router