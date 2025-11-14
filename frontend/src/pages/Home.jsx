import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

function Home() {
  const { userData , serverUrl,setUserData,getGeminiResponse} = useContext(UserDataContext);
  const navigate=useNavigate();
  const [listening,setListening]=useState(false);
  const [userText,setUserText]=useState("");
 const [aiText,setAiText]=useState("");
  const isSpeakingRef=useRef(false);
  const recoginitionRef=useRef(null);
  const isRecognizingRef=useRef(false);
  const synth=window.speechSynthesis;

const handleLogOut = async () => {
  try {
    await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
    setUserData(null);
    navigate("/signup");   // <-- ONLY CHANGE: correct lowercase path
  } catch (error) {
    setUserData(null);
    console.log(error);
    navigate("/signup");   // <-- also navigate on error
  }
};
const startRecognition =()=>{
  try {
    recoginitionRef.current?.start();
    setListening(true);
  } catch (error) {
    if(!error.message.include("start")){
      console.log("Recognition error:", error);
    }
  }
};



const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang='hi-IN';
  const voices=window.speechSynthesis.getVoices();
  const hindiVoice = voices.find(v=> v.lang==='hi-IN');
  if(hindiVoice){
    utterance.voice= hindiVoice;
  }


  isSpeakingRef.current=true;
  utterance.onend=()=>{
   setAiText("");
    isSpeakingRef.current=false;
    startRecognition();
    //recoginitionRef.current?.start();
  }
  window.speechSynthesis.speak(utterance);
};


const handleCommand = (data) => {
  const { type, userInput, response } = data;
  speak(response);

  if (type === 'google-search') {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  if (type === 'calculator-open') {
    window.open('https://www.google.com/search?q=calculator', '_blank');
  }

  if (type === 'instagram-open') {
    window.open('https://www.instagram.com', '_blank');
  }

  if (type === 'facebook-open') {
    window.open('https://www.facebook.com', '_blank');
  }

  if (type === 'weather-show') {
    const query = encodeURIComponent(userInput || 'weather');
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  if (type === 'youtube-search' || type === 'youtube-play') {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  }
};





useEffect(()=>{

  const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition=new SpeechRecognition();
  recognition.continuous=true;
  recognition.lang='en-US';



  recoginitionRef.current=recognition;

  const isRecognizingRef={current:false};

  const safeRecognition=()=>{
    if(!isSpeakingRef.current && !isRecognizingRef.current){
      try {
        recognition.start();
        console.log("Recognization request to start");
      } catch (error) {
        if(error.name !== "InvalidStateError"){
          console.log("start error:", err);
        }
        
      }
    }
  };

  const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what I can help you with?`);
  greeting.lang = 'hi-IN';
  window.speechSynthesis.speak(greeting);


  recognition.onstart =()=>{
    console.log("Recognition started");
    isRecognizingRef.current = true;
    setListening(true);
  };

  
  recognition.onend =()=>{
    console.log("Recognition ended");
    isRecognizingRef.current = false;
    setListening(false);
  };

  if(!isSpeakingRef.current){
    setTimeout(()=>{
     safeRecognition();

    }, 1000);
  };

  recognition.onerror = (event) =>{
    console.warn("Recognization error :", event.error);
    isRecognizingRef.current = false;
    setListening(false);

  if(event.error !== "aborted" && !isSpeakingRef.current){
    setTimeout(()=>{
      safeRecognition();

    }, 1000);
  }
  };



  recognition.onresult=async (e) => {
  const transcript = e.results[e.results.length - 1][0].transcript.trim();
  console.log("heard: " + transcript);
if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
  setAiText("");
  setUserText(transcript);
  recognition.stop();
  isRecognizingRef.current=false;
  setListening(false);
  const data = await getGeminiResponse(transcript);
  console.log(data);
  //speak(data.response);
  handleCommand(data);
  setAiText(data.response);
  setUserText("");
}

};


  recognition.start();

  const fallback=setInterval(()=>{
    if(!isSpeakingRef.current && !isRecognizingRef.current){
      safeRecognition();
    }
  }, 10000);

  safeRecognition();

  return ()=>{
    recognition.stop();
    setListening(false);
    isRecognizingRef.current=false;
    clearInterval(fallback);
  };

},[]);







  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col  
    gap-[15px]'>

      <button
          className="min-w-[150px] h-[60px] mt-[20px] text-black font-semibold bg-white absolute top-[20px] right-[20px]  cursor-pointer rounded-full text-[19px]" 
          onClick={handleLogOut} >
          Logout 
        </button>
      
      
      <button
          className="min-w-[150px] h-[60px] mt-[20px] text-black font-semibold bg-white absolute top-[100px] right-[20px]  cursor-pointer px-[10px] py-[15px] rounded-full text-[19px]"
         onClick={()=>navigate("/customize")}
        >
         Customize Your Assistant 
        </button>
        

      <div className='w-[200px] h-[300px] flex justify-center items-center overflow-hidden rounded-xl 
      hover:shadow-2xl hover:shadow-blue-950 cursor-pointer  hover:border-4  shadow-lg  gap-[20px]'>
        <img
          src={userData?.assistantImage || '/default-avatar.png'}
          alt="Assistant"
          className='h-full object-cover'
        />

         </div>
         <h1  className='text-white text-[18px]  '>I'm {userData?.assistantName}</h1>
        {!aiText && <img src={userImg} alt="User speaking" className="w-[180px]" />}
{aiText && <img src={aiImg} alt="AI responding" className="w-[180px]" />}

<h1 className='text-white'>{userText?userText:aiText?aiText:null}</h1>
    </div>
  );
}

export default Home;
