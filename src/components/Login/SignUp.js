
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {app, provider} from "../../fireBase/FireBase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const SignUp = () => {


  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const auth = getAuth();
  const SignUpHandler = async() => {
    if(name==="" || password==="" || email===""){
      alert('Please fill all the fields')
      return;
    }

    try {
      const UserData = await createUserWithEmailAndPassword(auth,email,password);
      console.log(UserData); 
      navigate('/')
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };


  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col w-1/3 h-3/5 gap-1 justify-evenly bg-[#f5f6f9]">
        <div className="flex justify-center items-center h-1/6">
          <p className="text-3xl border-b-2 border-red-400 capitalize m-0 p-0">
            SignUp
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              className="w-72"
              label="Username"
              variant="standard"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              className="w-72"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </Box>
          <FormControl sx={{ m: 1.5, width: "32ch" }} variant="standard">
            <InputLabel>Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="flex justify-center items-center h-1/6">
          <button type="submit"
            onClick={SignUpHandler}
            className="bg-red-500 hover:bg-blue-200 hover:text-black-800 text-gray font-bold py-2 px-6"
          >
            SignUp
          </button>
        </div>
        <div className="flex justify-center items-center h-1/6">
          <span
            onClick={() => navigate("/")}
            className="text-red-800 font-bold cursor-pointer hover:underline hover:text-blue-400"
          >
            Have an account?
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
