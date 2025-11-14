import React, { useContext, useRef, useState } from 'react';
import { LuImagePlus } from "react-icons/lu";
import Card from '../components/Card';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.jpeg";
import { UserDataContext } from '../context/UserContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
function Customize() {
    const{serverUrl,userData,setUserData ,BackendImage,
  setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage
}=useContext(UserDataContext);
    const navigate=useNavigate();

    const inputImage=useRef();
    const handleImage=(e)=>{
        const file=e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
return (
  <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center px-4 sm:px-[20px] py-[40px] relative overflow-hidden">

    {/* Back Button */}
    <IoMdArrowRoundBack
      className="absolute top-[20px] left-[20px] sm:top-[30px] sm:left-[30px] cursor-pointer text-white w-[40px] h-[40px] sm:w-[75px] sm:h-[40px]"
      onClick={() => navigate("/")}
    />

    {/* Title */}
    <h1 className="text-white text-[22px] sm:text-[30px] mb-[30px] text-center leading-snug">
      Select Your <span className="text-blue-500">Assistant Image</span>
    </h1>

    {/* Image Grid */}
    <div
      className="
        w-full max-w-[90%] sm:max-w-[60%]
        grid grid-cols-2 sm:flex sm:flex-wrap
        justify-center items-center
        gap-[20px] sm:gap-[10px]
      "
    >
      <Card image={image1} />
      <Card image={image2} />
      <Card image={image3} />
      <Card image={image4} />
      <Card image={image5} />
      <Card image={image6} />
      <Card image={image7} />

      {/* Upload Image Card */}
      <div
        className={`w-[100px] sm:w-[100px] h-[150px] sm:h-[150px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${
          selectedImage === "input"
            ? "border-4 border-blue shadow-2xl hover:shadow-blue-950"
            : ""
        }`}
        onClick={() => {
          inputImage.current.click();
          setSelectedImage("input");
        }}
      >
        {!frontendImage && (
          <LuImagePlus className="text-white w-[28px] h-[28px] sm:w-[25px] sm:h-[25px]" />
        )}
        {frontendImage && (
          <img src={frontendImage} className="h-full w-full object-cover" />
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
    </div>

    {/* Smaller Next Button */}
    {selectedImage && (
      <button
        className="w-[80px] sm:w-[90px] h-[40px] sm:h-[45px] mt-[25px] text-black font-semibold bg-white cursor-pointer rounded-full text-[16px] sm:text-[18px] shadow-md hover:scale-105 transition-transform"
        onClick={() => navigate("/customize2")}
      >
        Next
      </button>
    )}
  </div>
);


}

export default Customize;
 