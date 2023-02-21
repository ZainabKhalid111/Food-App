
import './App.css';
import { useState,createContext } from 'react';
import Homepage from './Components/Homepage/Homepage';
import Themebtn from './Components/themebtn/Themebtn';


// create the context
// provide the context
// consume the context


export const themeContext = createContext(null);


function App() {

  const [theme, setTheme] = useState(false)

  return (
    <themeContext.Provider
    value = {{
      theme,setTheme,
    }}>
    <div className="container-fluid App" style={theme ? {} : {}}>
      <Themebtn/>
    <Homepage/>
    </div>
    </themeContext.Provider>
  );
}

export default App;
