import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../components/context/AuthContext'




const Signup = () => {

//register procedure
const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    phone: undefined,
    email: undefined,
    city:undefined,
    country:undefined
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      //if(res.data.isAdmin){//check this code to control user and admin access to login
      if(res.data){
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      
      navigate("/login");

                          }
      else{
        dispatch({type:"REGISTER_FAILURE",payload:{message:"Invalid input for Registration!"}})
      }
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: {message:"Registration Unsuccessful! Please try again"}});
    }
  };
  console.log(user);






    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="">

                <h1 className="text-center m-4 font-bold text-2xl">Create an Account</h1>

                <div className="mx-14 mt-10 mb-5 grid grid-cols-1 sm:grid-cols-2">
                    <div className="flex justify-center items-center m-3">
                        <button className="w-48 flex justify-center items-center text-blacky-light p-3 shadow-lg shadow-gray-500 rounded-md text-xs">
                            <img src={require('../Assets/Google.png')} alt="Google" className="h-4 w-4 mr-2" />
                            Sign Up with Google
                        </button>
                    </div>
                    <div className="flex justify-center items-center m-3">
                        <button className="w-48 flex justify-center items-center text-blacky-light p-3 shadow-lg shadow-gray-500 rounded-md text-xs">
                            <img src={require('../Assets/Facebook.png')} alt="Facebook" className="h-4 w-4 mr-2" />
                            Sign Up with Facebook
                        </button>
                    </div>
                </div>

                <p className="text-center text-blacky-light text-sm m-2">- OR -</p>

                <div className="flex flex-col">
                    <input type="text" className="mx-14 p-3 outline-none border border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:ring-offset-0 border-b-blacky-medium hover:border-b-evergreen duration-500" placeholder="Your Name" id="username"required onChange={handleChange}/>
                    <input type="email" className="mx-14 p-3 outline-none border border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:ring-offset-0 border-b-blacky-medium hover:border-b-evergreen duration-500" placeholder="E-mail" id="email" required onChange={handleChange}/>
                    <input type="tel" className="mx-14 p-3 ooutline-none border border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:ring-offset-0 border-b-blacky-medium hover:border-b-evergreen duration-500" placeholder="Mobile Number" id="phone" required onChange={handleChange}/>
                    <input type="password" className="mx-14 outline-none border border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:ring-offset-0 border-b-blacky-medium hover:border-b-evergreen duration-500" placeholder="Create Password" id="password" required onChange={handleChange}/>
                    <input type="text" className="mx-14 p-3 ooutline-none border border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:ring-offset-0 border-b-blacky-medium hover:border-b-evergreen duration-500" placeholder="City" id="city" required onChange={handleChange}/>
                    <input type="text" className="mx-14 outline-none border border-t-transparent border-l-transparent border-r-transparent focus:ring-0 focus:ring-offset-0 border-b-blacky-medium hover:border-b-evergreen duration-500" placeholder="Country" id="country" required onChange={handleChange}/>
                
                </div>

                <div className="mx-14 my-5">
                    <button className=" hover:bg-evergreen duration-500 bg-blacky-dark text-whiteglow w-full rounded-md p-2 my-5" disabled={loading}
                        onClick={handleClick}>Create Account</button>
                           {error && <span>{error.message}</span>}   
                </div>

                <p className="mx-14">Already have an account?
                    <Link className="" to="/Login">Login</Link></p>
            </div>

            <div className="bg-evergreen flex justify-center items-center">
                <img src={require('../Assets/Trouvailler.png')} alt="" className="" />
            </div>
        </div>
    )
}
export default Signup
