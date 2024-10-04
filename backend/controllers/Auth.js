
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs'

const Register = async (req, res) => {
    try {
        const {FullName,email,password}=req.body

        const imagePath = req.file.filename;

          console.log(imagePath)
    
        const existUser= await UserModel.findOne({email})
        if (existUser) {
            return res.status(301).json({success:false,message:"User Already Exist Please Login"})
        }
        const hasePassword= await bcrypt.hashSync(password,10)
        const newUser = new UserModel({
            FullName: FullName,
            email: email,
            password: hasePassword,
            profile: imagePath,
        });

      
        await newUser.save();



        res.status(201).json({success:true, message: 'User registered successfully',user:newUser});
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({ error: 'Error during registration' });
    }
}



const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const FindUser = await UserModel.findOne({ email });
        if (!FindUser) {
            return res.status(404).json({ success: false, message: "Account not found. Please register." });
        }
        const comparePassword = await bcrypt.compare(password, FindUser.password);
        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECREATE);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
        });
        
        return res.status(200).json({ success: true, message: "Login successfully", user: FindUser, token });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const Logout=async(req,res)=>{
    try {
        
        res.clearCookie('token');

    
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
    
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export {Register,Login,Logout}