import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import NotesState from "./context/notes/NotesState";
import Alert from "./components/Alert";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);
  
  
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  return (
    <div>
      <NotesState>
        <BrowserRouter>
          <Navbar />
          <Alert alert= {alert}/>
          <div className="container">
          
            
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />

      
            <Route path="login" element={<LogIn showAlert={showAlert} />} />
            <Route path="signup" element={<SignUp showAlert={showAlert} />} />
          </Routes>
          </div>
        </BrowserRouter>
      </NotesState>
    </div>
  );
}

export default App;
