import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';

import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId,setEmailId] = useState("Deep@gmail.com");
    const [password,setPassword] = useState("Deep@123#");
    const navigate = useNavigate();
    const dispatch = useDispatch();

   const handleLogin = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/login`,
      {
      emailId,   // match backend field name
      password,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res.data));
    navigate("/");

  } catch (err) {
    console.log("Login Error:", err.response?.data || err.message);
  }
};
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login