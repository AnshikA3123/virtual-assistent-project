import React, { useContext, useState } from "react";
import bg from "../assets/authimage.jpg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function SignUp() {
  const [Showpassword, setShowPassword] = useState(false);
  const { serverUrl ,userData,setUserData} = useContext(UserDataContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoding] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
        
      );
     setUserData(result.data);
     //console.log(result)
      setLoding(false);
      navigate("/customize");
      alert("Signup successful!");
      
    } catch (error) {
      console.log(error.response?.data || error.message);
      setUserData(null);
      setLoding(false);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] max-w-[500px] bg-black/50 backdrop-blur shadow-lg flex flex-col items-center justify-center gap-[20px] px-[20px] py-[40px] rounded-2xl"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-4">
          Register To{" "}
          <span className="text-blue-500 ml-[10px]">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative flex items-center">
          <input
            type={Showpassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full h-full rounded-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!Showpassword ? (
            <IoMdEye
              className="absolute right-[30px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <IoMdEyeOff
              className="absolute right-[30px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <button
          className="min-w-[150px] h-[60px] mt-[20px] text-black font-semibold bg-white rounded-full text-[19px]"
          type="submit" disabled={loading}
        >
          { loading?"Loading...":"Sign Up"}
        </button>

        <p
          className="text-white mt-[20px] text-[18px] cursor-pointer"
          onClick={() => navigate("/SignIn")}
        >
          Already have an account?{" "}
          <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
