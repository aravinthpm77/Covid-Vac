import React from "react";
import { Route,Routes } from "react-router";
import Auth from './page/Auth/Auth' 
const AllRoutes =()=>{
    return(
        <div>
            
            <Routes>
                
                <Route exact path='/' element={<Auth/>}/>
            </Routes>
        </div>
    )
}

export default AllRoutes;