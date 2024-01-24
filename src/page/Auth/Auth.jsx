import React,{useRef,useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import './Auth.css'
const Auth = () =>{
    
    useEffect(() => {
    
        fetchUserData();
    }, []);
    const navigate = useNavigate();

    const [isSignup,setIsSignup]=useState(false);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [formSubmitted,setformSubmitted]=useState(false);
    const formRef=useRef(null);
    const handleSwitch =()=>{
        setIsSignup(!isSignup);
    }
    const [userData, setUserData] = useState([]);

    const fetchUserData = async () => {
        try {
        const response = await axios.get('http://localhost:5000/user');
        
        setUserData(response.data);
        console.log("Fetching : ",response);
        } catch (error) {
        console.error('Error fetching employee data:', error);
        }
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(name,email,password,"Email Details");
        try{
            if(isSignup){
                axios.post('http://localhost:5000/user',{name,email,password})
                .then(
                    res=>alert("Successfully Inserted "))
                     
                .catch(err=>alert(err,"error"));
                    
                setformSubmitted(true);
                navigate('/')
            }
            
            if(!isSignup){
                
                
                if (email === "admin@gmail.com" && password==="admin@123" ) {
                    navigate("/admin-dashboard"); // Redirect to admin dashboard
                } 
                else {
                    const response = axios.post('http://localhost:5000/user-login',{email,password})
                    .then(response => {
                        console.log(response.data);
                        if (response.data && response.data.Status === 'Success') {
                            alert('Login successful!');
                            navigate('/user-dashboard');
                        } else {
                            alert(`Error: ${response.data.Error}`);
                    }})
                    .catch(error => {
                        console.error('Error:', error);
                        alert("Error");
                    });
                    
                    
                        setformSubmitted(true);
                        
                }
                
                    
                
            }
        }
        catch(error){
            console.error('Authentication error',error);
            
        }
        
        
    }
    return( 
       <div className="main">
        <div className="main-1">
            <form className="form_display" onSubmit={handleSubmit}>
               <p className="form_text"> {isSignup ? 'Sign Up' :'Log In'}</p>
                {isSignup && 
                
                <label>
                    <input className="inputauth" type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Enter the name"/>

                </label>
                }
                <input type="email" className="inputauth"  placeholder="Enter the Email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" className="inputauth" placeholder="Enter the Password"  onChange={(e)=>{setPassword(e.target.value)}}/>


                <button  className="submitbtn" type="submit" >{isSignup ? 'Sign UP' : 'Log In'}</button>



            </form>
            <p className="switch_content">
                {isSignup ? 'Already have account':'Create new account'}
                <button type="button"  onClick={handleSwitch}> {isSignup ? 'Log In' : 'Sign Up'}</button>
            </p>
        </div>
        
        
        
       </div> 
    )
}
export default Auth