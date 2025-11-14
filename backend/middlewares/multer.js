import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure public directory exists
const publicDir = "./public";
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,publicDir);
    },
    filename:(req,file,cb)=>{
        // Use timestamp to avoid filename conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const upload=multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export default upload;