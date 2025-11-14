import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
function Customize2() {
    const{userData,backendImage,selectedImage, setUserData, serverUrl}=useContext(UserDataContext);
    const[assistantName,setAssistantName]=useState(userData?.assistantName || "");
    const [loading,setLoding]=useState(false);
    const navigate=useNavigate();


    const handleUpdateAssistant=async ()=>{
        setLoding(true);
        try {
            if (!assistantName || assistantName.trim() === "") {
                alert("Please enter an assistant name");
                setLoding(false);
                return;
            }

            let formData= new FormData()
            formData.append("assistantName",assistantName.trim());
            if(backendImage){
                formData.append("assistantImage",backendImage);
            }else if(selectedImage){
                formData.append("imageUrl",selectedImage);
            }
            
            const result=await axios.post(`${serverUrl}/api/user/update`,formData,{
                withCredentials:true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setLoding(false);
            console.log("Update successful:", result.data);
            setUserData(result.data);
            navigate("/");
        } 
        catch (error) {
            setLoding(false);
            console.error("Update error:", error);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to update assistant";
            alert(errorMessage);
        }
    }





  return (
    <div className='w-full h-[100vh]    bg-gradient-to-t from-[black] to-[#030353]  flex justify-center items-center flex-col  gap-[20px] px-[20px] py-[40px]  relative '>
        <IoMdArrowRoundBack  className='absolute   top-[30px]  left-[30px]  cursor-pointer text-white w-[75px] h-[40px]   '  
        onClick={()=>navigate("/customize")}   />
        <h1 className='text-white text-[30px] mb-[30px] text-center'>Enter Your <span className='text-[blue]' > Assistant Name</span></h1>
        

    <input
          type="Text"
          placeholder="Enter Name eg.shifra"
          className="w-full h-[60px]  max-w-[600px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}
          />
          {assistantName && <button className=" min-w-[300px] h-[60px] mt-[30px] text-black 
       font-semibold bg-white cursor-pointer  rounded-full text-[19px]"    disabled={loading} onClick={()=>{
         handleUpdateAssistant(); }
    
    
       
       }>
       { !loading? "Create Your Assistant":"loading..." }  </button>}
      
    </div>
  )
}

export default Customize2;