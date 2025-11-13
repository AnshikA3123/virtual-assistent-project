import jwt  from "jsonwebtoken" ;     
const genToken=async (userId)=>{      //generate  token 
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn:"10d"});
        return token;
    } 
    catch(error){
        console.log(error);

    }
}
export default genToken;