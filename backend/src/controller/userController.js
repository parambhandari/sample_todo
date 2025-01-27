const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");


const SignUP = async function (req, res) {
  try {
    const { firstName, lastName, email, mobileNumber, password  , role} = req.body;
    
    if (!firstName) {
      return res
        .status(404)
        .json({ success: false, message: "first name is required" });
    }

    if (!lastName) {
      return res
        .status(404)
        .json({ success: false, message: "last name is required" });
    }

    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "email is required" });
    }

    if (!mobileNumber) {
      return res
        .status(404)
        .json({ success: false, message: "mobile number  is required" });
    }

    if (!password) {
      return res
        .status(404)
        .json({ success: false, message: "password  is required" });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
      role
    });
    
    const user = await newUser.save();

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_TOKEN
    );

    res.status(200).json({
      success: true,
      message: "Signup successful",
      data: { firstName, lastName, mobileNumber, email ,role },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

const login = async function (req, res) {
  try {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile) {
      return res.status(400).json({ 
        success: false,
        message: "Email/Mobile  are required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: " Password are required",
      });
    }

    const user = await userModel.findOne({
      $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id.toString(), firstName: user.firstName },
      process.env.JWT_TOKEN
    );

    res.status(200).json({
      success: true,
      accessToken,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const get_all_employees = async(req,res) =>{
try {
  const userId = req._id;
  if(!userId){
    return res.status(404).josn({sucess:false ,message:"User is missing"})
  }

  const all_employee = await User.find({role:"employee"}).select("_id firstName lastName")
  if(!all_employee){
    return res.status(404).json({success:false , message:"failed to fetch employee"})
  }

  return res.status(200).json({success:true , message:"fetched employee" , data:all_employee})
} catch (error) {
  return res.status(500).json({success:false ,message:"internal server error"})
}



}

module.exports = {
  SignUP,
  login,
  get_all_employees
};
