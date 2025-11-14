
import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext';

function Card({image}) {
     const{serverUrl,userData,setUserData ,BackendImage,
      setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage
    }=useContext(UserDataContext);
  return (
    <div
      className={`w-[100px] h-[150px] mr-[20px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden
      hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white
      ${selectedImage === image ? "border-4 border-blue-500 shadow-2xl shadow-blue-950" : ""}`}
      onClick={() => {setSelectedImage(image);
        setBackendImage(null);
        setFrontendImage(null);
      }}
    >
      <img src={image} alt="assistant" className="h-full w-full object-cover" />
    </div>
  )
}

export default Card;