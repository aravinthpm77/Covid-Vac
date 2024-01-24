import React,{useState,useEffect} from "react";
import axios from "axios"
import './userHome.css'
import SearchBar  from "../../components/Search/Searchbar"
import { SearchResultsList } from "../../components/Search/SearchResultsList";
const Userhome =()=>{
    useEffect(() => {
    
        fetchVacData();
        const intervalId = setInterval(fetchVacData, 600);

        
        return () => clearInterval(intervalId);
    }, []);


    const [results, setResults] = useState([]);

    const fetchVacData = async () => {
        try {
        const response = await axios.get('http://localhost:5000/vac');
        
        setVacData(response.data);
        } catch (error) {
        console.error('Error fetching Vaccation data:', error);
        }
    };
    const [VacData, setVacData] = useState([]);

    
    
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleBook = async (name,slots)=>{
        try{
            const response = axios.post("http://localhost:5000/book-slot",{
               name,
               slots,
            });
        
            console.log(name,slots,response);
            if (response.data && response.data?.Status === 'Success'){
            
                setBookingSuccess(true);
                alert("Booked Slot")
            } else {
                console.error('Booking failed:', response.data?.message || 'Unknown Error');
            }
        } catch (error) {
        console.error('Error booking slot:', error);
        }
    };
    useEffect(() => {
        // Redirect or update UI logic after successful booking
        if (bookingSuccess) {
            // Example: Redirect to a different page
            // You can replace this with your actual logic
            window.location.href = '/booking-success';
        }
    }, [bookingSuccess]);

    return(


       
        <div className="main-user">
            <p className="main-text">User Page</p>
            <p className="main-cat">Book <span>CoVID</span> Vaccine Slots Now</p>
            <div className="search-section">

                <SearchBar setResults={setResults} />
                {results && results.length > 0 && <SearchResultsList results={results} />}  
                 {/* className="Searchtype" /> */}
            </div>
            

            <div className="section1">

                <div className="display-content">
                    <h3>APPROVED BY COWIN</h3>
                    <p className="text">Find vaccination centers near you. Search slots by location, pin code or by district. Book Covaxin, Covishield, or Sputnik V. Get Vaccinated with 1st or 2nd dose.</p>
                    {
                        
                        VacData.map((vac)=>(
                            
                            <div className="vac-container">
                                <div className="City">
                                    <p><span>City : </span>{vac.Name}</p>
                                    
                                </div>
                                <div className="slots">
                                    <p>Slots: {vac.Slots} </p>
                                </div>
                                <button type="button" className="btn"  onClick={()=>handleBook(vac.Name,vac.Slots)}>Book</button>
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