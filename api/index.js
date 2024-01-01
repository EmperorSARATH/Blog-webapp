import express  from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";

const app = express()

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'../client/public/upload')
    },
    filename:function(req,file,cb){
       cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage })

app.post('/api/upload',upload.single('file'), function(req,res){
    const file = req.file;
    res.status(200).json(file.filename);
})

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use("/api/posts",postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)

app.listen(8800,()=>{
    console.log("connected");
})