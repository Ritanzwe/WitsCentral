const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");

const login = async(req,res) =>{
    try {
        const {email,password} = req.body;
        console.log("sss");

        if (!email || !password ) {
            return res.status(400).json({ error: "All details are required" });
        }

        const findUser = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(password,findUser?.password || "");

        if(!findUser || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
        }

        const token = generateTokenAndSetCookie(findUser._id,res);

        const returnThing = {
            fullname:findUser.fullname,
            email:findUser.email,
            profilePicture:findUser.profilePicture,
            role:findUser.role,
            contactInfo:findUser.contactInfo
        }

        res.status(201).json({
            token,
            ...returnThing
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

const signup = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;
        let { role } = req.body;

        if (!fullname || !email || !password ) {
            return res.status(400).json({ error: "All details are required" });
        }

        if(!role){
            role = "student";
        }

        const type_of_users = ['student', 'admin', 'serviceProvider'];

        if (!type_of_users.includes(role)) {
            return res.status(400).json({ error: "undefined user type" });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ error: "email is already registered" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        const token = generateTokenAndSetCookie(newUser._id, res);

        const returnThing = {
            fullname:newUser.fullname,
            email:newUser.email,
            profilePicture:newUser.profilePicture,
            role:newUser.role,
            contactInfo:newUser.contactInfo
        }

        res.status(201).json({
            token,
            ...returnThing
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);

        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = async(req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};


module.exports = {
    login,
    signup,
    logout,
}