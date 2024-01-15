import React,{useState} from "react";
import axios from "axios"
import './userHome.css'
const Userhome =()=>{
    const [employeeData, setEmployeeData] = useState([]);


    var vacList=[{
        _id:'1',
        cityName:"Hosur",
        slots:'20',
    },{
        _id:'2',
        cityName:"Bengaluru",
        slots:'53',
    },{
        _id:'3',
        cityName:'Salem',
        slots:'32',
    },{
        _id:'4',
        cityName:'Vellore',
        slots:'37',
    },{
        _id:'5',
        cityName:'Tambaram',
        slots:'36',
    }]

    return(


       
        <div className="main-user">
            <p className="main-text">User Page</p>
            <p className="main-cat">Book <span>CoVID</span> Vaccine Slots Now</p>
            <div className="search-section">
                <img width="23" height="23" className="search-icon" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
                <input type="text" placeholder="Search City,District" className="Searchtype" />
            </div>
            

            <div className="section1">

                <div className="display-content">
                    <h3>APPROVED BY COWIN</h3>
                    <p className="text">Find vaccination centers near you. Search slots by location, pin code or by district. Book Covaxin, Covishield, or Sputnik V. Get Vaccinated with 1st or 2nd dose.</p>
                    {
                        
                        vacList.map((vac)=>(
                            <div className="vac-container">
                                <div className="City">
                                    <p><span>City : </span>{vac.cityName}</p>
                                    
                                </div>
                                <div className="slots">
                                    <p>Slots: {vac.slots} </p>
                                </div>
                                <button type="button" className="btn">Book</button>
                            </div>
                        ))
                    }
                </div>
                <div className="section">
                    <div className="app-ad1">
                        
                        <h3>Download CoVID Care App</h3>

                        <p>Access your vaccination certificate without internet</p>
                        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/google-play.png" alt="google-play"/> 
                        <button type="button" className="Download">Download App</button>
                    </div>
                </div>
            </div>
            

        </div>
    )
}
export default Userhome;