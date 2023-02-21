import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import './Search.css';
import { themeContext } from '../../App';


const Search = (props) => {

    // console.log(props);
    // destructuring getdata from props
const {theme} = useContext(themeContext)

    const { getData, apiCalledSucces, setapiCalledSucces } = props;
    // console.log(getData)
    const [inputValue, setinputValue] = useState('');

    const handleInputValue = (event) => {
        const { value } = event.target;

        // set the updated state
        setinputValue(value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // calling function from
        getData(inputValue);
    }

    useEffect(() => {
      
    if(apiCalledSucces)
    {
        setinputValue('');
        setapiCalledSucces(false)
    }
   
    },[apiCalledSucces])
    
    return (
        <form action="" className="search" onSubmit={handleSubmit}>
            <input type="search" onChange={handleInputValue} value={inputValue
            } placeholder='Search Recipes' id='search' />
            <button type='submit' style={theme ? { backgroundColor: '#fa6400', color: 'white' } : { backgroundColor: '#0197d7', }}  >Search</button>
        </form>
    )
}

export default Search
