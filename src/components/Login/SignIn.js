import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {  googleProvider,facebookProvider} from "../../fireBase/FireBase";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const auth = getAuth();
  const SumbitHandeler=()=>{
    
    signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
        // Signed in
        console.log("User signed in successfully!");
        navigate("/home");
      })
     .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async function GooglePopUpHandeler(){
    try {
          const result = await signInWithPopup(auth,googleProvider);
          console.log("Google Sign In Successful", result);
          alert("Google Sign In Successful");
          navigate("/home");
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
    
  }

  async function facebookHandeler(){
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Sign In Successful", result);
      alert("Facebook Sign In Successful");
      navigate("/home");
    } catch (error) {
      console.error("Facebook Sign-In Error:", error.message);
      alert(error.message);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh] ">
      <div className=" flex flex-col h-[60vh] w-[25%] bg-[#f5f6f9]">
        <div className=" flex justify-center items-center h-[20%]">
          <p className="text-2xl border-b-2 border-red-400 captialize">
            Signin
          </p>
        </div>
        <div className=" flex flex-col justify-center items-center h-[50%] ">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              className="w-72"
              id="input-with-sm"
              label="email"
              variant="standard"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </Box>
          <FormControl sx={{ m: 1.5, width: "33ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="flex justify-center items-center h-[15%] ">
          <button onClick={SumbitHandeler} class="bg-red-500 hover:bg-blue-200 hover:text-black-800 text-gray font-bold py-2 px-6">
            SignIn
          </button>
        </div>
        <div className="flex justify-center items-center gap-2 h-[15%] ">
          <span className="font-bold">New on our platform?</span>
          <span
            onClick={() => navigate("/signup")}
            className="text-red-800 font-bold cursor-pointer hover:underline hover:text-blue-400"
          >
            Create an account
          </span>
        </div>
        <div className="h-[10%] flex w-full justify-between items-center text-sm">
          <button onClick={GooglePopUpHandeler} class=" w-[40%] bg-blue-200 hover:bg-red-700 hover:text-white font-bold py-2 px-6">
          Google SignIn
          </button>
          <button onClick={facebookHandeler} className="w-[40%] text-white bg-[#0866ff] py-2 px-2 hover:bg-blue-200 hover:text-black font-bold">With Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
