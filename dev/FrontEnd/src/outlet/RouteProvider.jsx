import React, { useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import ToS from '../pages/ToS'
import SignScreen from '../pages/SignScreen'
import TaskList from '../pages/TaskList'
import Home from '../pages/Home'
import StatPage from '../pages/StatPage'
import Profile from '../pages/Profile'
import { auth } from '../../firebaseConfig'
import { useAuth } from '../context/AuthContext'


const RouteProvider = () => {
    const userName = auth.currentUser
    const {user} = useAuth()
    
useEffect(()=>{
    console.log(user)
    userName?console.log(`User: ${userName}`):console.log('No user loaded')
},[])
    return (
        <Routes>
            <Route path="/" element={<SignScreen />} />
            <Route path="/tos" element={<ToS />} />
            <Route element={<PrivateRoutes />} >
            <Route path="/alltasks" element={<TaskList />} />
            <Route path="/home" element={<Home />} />
            <Route path="/statpage" element={<StatPage />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
        </Routes>
    )
}

export default RouteProvider
