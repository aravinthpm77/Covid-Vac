import React from "react";
import { Route,Routes } from "react-router";
import Auth from './page/Auth/Auth' 
import UserDash from './page/UserPage/userhome'
import AdminDash from "./page/Admin/Adminhome";
const AllRoutes =()=>{
    return(
        <div>
            
            <Routes>
                <Route exact path='/user-dashboard' element={<UserDash/>}/>
                <Route exact path='/' element={<Auth/>}/>
                <Route exact path='/admin-dashboard' element={<AdminDash/>}/>
            </Routes>
        </div>
    )
}

export default AllRoutes;