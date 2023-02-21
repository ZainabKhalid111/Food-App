import React from 'react';
import './Themebtn.css'
import { themeContext } from '../../App';
import { useContext } from 'react';

const Themebtn = () => {

    const {theme, setTheme} = useContext(themeContext)

  return (
    <button style={theme ? { backgroundColor: '#fa6400', color: 'white' } : { backgroundColor:'#0197d7',}} className='btn theme_btn' onClick={() => setTheme(!theme)} >Change Theme</button>
  )
}

export default Themebtn
