import React, { useRef, useState ,useEffect } from 'react'
import axios from 'axios'
import "./Adminhome.css"
const AdminHome = () =>{

    useEffect(() => {
    
        fetchVacData();
    }, []);

    
    
    const[Name,setName]=useState('');
    const[Slots,setSlots]=useState('');
    
    const [formSubmitted,setformsubmitted]=useState(false);
    
    const formRef=useRef(null);
    
    
    const handleReset = () => {
        
        const shouldReset = window.confirm("Are you sure you want to reset the form?");
        if (shouldReset) {
        
          formRef.current.reset();
         
          
          setName('');
          setSlots('');
          
        }
        
    }
    
    
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("1");
        console.log(Name,Slots,11);
        axios.post('http://localhost:5000/vac',{Name,Slots})
        .then(
        res=>alert("Successfully Inserted "))
        
        .catch(err=>alert(err,"error"));
        
        setformsubmitted(true);
        
        formRef.current.reset();
    }

    const [VacData, setVacData] = useState([]);

    

    const fetchVacData = async () => {
        try {
        const response = await axios.get('http://localhost:5000/vac');
        
        setVacData(response.data);
        } catch (error) {
        console.error('Error fetching Vaccation data:', error);
        }
    };
    
    return (
        <div className='Main_class'>
            
            <div className='form-con'> 
            <p>Admin Page</p>
                <div className='form-box'>
                
                    
                    <form  ref={formRef} onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter the City Name"  onChange={(e)=>{setName(e.target.value)}} required/>    
                        <input type="number" placeholder='Enter Slots Available'  onChange={(e)=>{setSlots(e.target.value)}} required/>

                        <button type="submit" className='sumbtn' >Submit</button>
                       
                    </form>
                    <button type="reset" className='rstbtn' id='rstbtn' onClick={handleReset}>Reset</button>            
                </div>
                
            </div>
            {formSubmitted && 
            <div className='table_show'>
                <h2>Vaccination Data</h2>
                
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        
                        
                        <th>Experience</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {VacData.map((vacdata) => (
                        <tr key={vacdata.id}>
                        <td>{vacdata.id}</td>
                        <td>{vacdata.Name}</td>
                        
                        <td>{vacdata.Slots}</td>
                        
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>}
                
            
        </div>
        
    )
}
export default AdminHome