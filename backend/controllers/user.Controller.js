import { response } from "express";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from  "../models/user.model.js"
import moment from "moment/moment.js";
export const getCurrentUser=async (req,res)=>{
    try{
        const userId=req.userId;
        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        return res.status(200).json(user);

    }
    catch(error){
        return res.status(400).json({message:"get current  user error "});
    }
}

export const updateAssistant=async (req,res)=>{
    
    try {
        // Check if userId exists (from isAuth middleware)
        if (!req.userId) {
            return res.status(401).json({message:"User not authenticated"});
        }

        const {assistantName, imageUrl}=req.body;
        let assistantImage;
        
        if(req.file){
            assistantImage=await uploadOnCloudinary(req.file.path);
        }
        else if(imageUrl){
            assistantImage=imageUrl;
        }
        
        // Ensure at least assistantName is provided
        if (!assistantName) {
            return res.status(400).json({message:"Assistant name is required"});
        }

        const updateData = {assistantName};
        if (assistantImage) {
            updateData.assistantImage = assistantImage;
        }

        const user=await User.findByIdAndUpdate(req.userId, updateData, {new:true}).select("-password");
        
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        return res.status(200).json(user);
    
    } catch (error) {
        console.log("Update Assistant Error:", error);
        return res.status(400).json({message:"Update Assistant error", error: error.message});
    }
};


export  const askToAssistant=async (req,res)=>{
    try {
        const {command}=req.body;
        const user=await User.findById(req.userId);
        user.history.push(command);
        user.save();
        const userName=user.name;
        const  assistantName=user.assistantName;
        const result=await geminiResponse(command,assistantName,userName);


        const jsonMatch=result.match(/{[\s\S]*}/);
        if(!jsonMatch){
            return res.status(400).json({response:"sorry,i can't understand"});

        }
        const gemResult=JSON.parse(jsonMatch[0]);
        const type=gemResult.type;

        switch(type){
            case 'get-date':
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`current date is ${moment().format("YYYY-MM-DD")}`

                } );
                case 'get-time':
                    return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`current time is ${moment().format("hh:mm-A")}`

                } );
                case 'get-day':
                    return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`current day is ${moment().format("dddd")}`

                } );

                case 'get-month':
                    return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:`current month is ${moment().format("MMMM")}`

                } );
                case 'google-search':
                 case 'youtube-search':
                case 'youtubep-play':
                 case 'general':
                 case "calculator-open":
                 case "instagram-open":
                 case "facebook-open":
                  case "weather-show":

                return res.json({
                    type,
                     userInput:gemResult.userInput,
                     response:gemResult.response,
                });
                
                default:
                    return res.status(400).json({response: "I didn't understand that command"});
            

        };



    } catch (error) {
         return res.status(500).json({response: "Ask assistant error "});
    }
}