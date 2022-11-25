import React from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Navbar = () => {
  //const { user } = useContext(AuthContext);

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  //logout code fetching
  const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGOUT" });
      try {
        const res = await axios.get("/auth/logout");
        localStorage.removeItem("user");
        if(res){
        
        navigate("/");
  
                            }
        
      } catch (err) {
        dispatch({ type: "LOGOUT", payload: {message:"logged out"} });
      }
    };
    console.log(user);
     // {user?():()}



  return (
    <header class="text-blacky-light body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <img src={require('../../Assets/TrouvaillerGreen .png')} alt="" className="px-14" />
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a class="text-sm mr-5 text-blacky-light hover:text-evergreen duration-500"><Link className="" to="/">Home</Link></a>

          {user?
          {/*This section should navigate to user's bid page only after logging in*/}
          (<a class="text-sm mr-5 text-blacky-light hover:text-evergreen duration-500"><Link className="" to="/bid-status">My bids</Link></a>
        ):(
          <a class="text-sm mr-5 text-blacky-light hover:text-evergreen duration-500"><Link className="" to="/login">My bids</Link></a>
        )}

          <a class="text-sm mr-5 text-blacky-light hover:text-evergreen duration-500"><Link className="" to="/">About Us</Link></a>
          <a class="text-sm mr-5 text-blacky-light hover:text-evergreen duration-500"><Link className="" to="/">Contact</Link></a>
        </nav>
        {user?<div><span>{user.username}</span>
        <button className="bg-whiteglow text-blacky-dark text-sm border border-none duration-500 px-4 py-2 mx-4 hover:bg-blacky-dark rounded-md hover:text-whiteglow" onClick={handleClick}>Logout</button></div>:(
        <div className="md:flex my-4">
           <button className="bg-whiteglow text-blacky-dark text-sm border border-none duration-500 px-4 py-2 mx-4 hover:bg-blacky-dark rounded-md hover:text-whiteglow">
            <Link className="" to="/login" >Login</Link>
            </button>

            <button className="bg-evergreen text-blacky-dark text-sm border border-none duration-500 px-4 py-2 mx-4 hover:bg-blacky-dark rounded-md hover:text-whiteglow">
            <Link className="" to="/signup">Signup</Link>
            </button>
          </div>)}
      </div>
    </header>
  )
}

export default Navbar
