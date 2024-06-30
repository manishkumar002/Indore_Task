import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./components/pages/Header"
import SignUp from "./components/pages/SignUp"
import Login from "./components/pages/Login"
import AddProduct from "./components/pages/AddProduct"
import ViewProduct from "./components/pages/ViewProduct" 
import './App.css';
 
function App() {
  return (
   
    <div>
    <BrowserRouter>
      <Header/>
   
      <Routes>
        <Route path="/sign" element={<SignUp/>}/>
        <Route path="/" element={<Login/>}/>
       <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/viewproduct" element={<ViewProduct/>}/>
        
      </Routes> 
       </BrowserRouter> 
    </div>
    
    
  )
}

export default App;
