import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./Searchbar.css";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    
      fetch("http://localhost:5000/vac")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.Name &&
            user.Name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
    
   
    
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input className="search_input"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
export default SearchBar