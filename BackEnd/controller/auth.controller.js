import { signToken } from "../middleware/jwt_sign.js";
import  prisma  from "../prismaClient.js";
import { validateUserInput } from "../utils/validateFields.js";

export const signupUser = async (req,res) => {
  try {
    const {userName, email, password} = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({message : "All fields are required"});
    }

    const errors = validateUserInput({userName, email, password});
    if(errors.length > 0){
      return res.status(400).json({errors})
    }
    
    const alreadyExisted = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (alreadyExisted) {
      return res.status(409).json({message: "user already exist"});
    }

    const newUser = await prisma.user.create({
      data:{
        userName,
        email,
        password,
        role : 'USER'
      }
    })

    const token = signToken(newUser);

    return res.status(201).json({message : "new User Created",token,newUser})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Signup failed' });
  }
}

export const loginUser = async (req,res) => {
  try {
    const {email,password} = req.body;

    const user = await prisma.user.findFirst({
      where : {
        email,
        password
      }
    })
    if (!user) {
      return res.status(401).json({message: "Invalid email or Password"})
    }

    const {id, role, userName} = user;
    const token = signToken({id,email,role,userName});


    return res.status(200).json({message: "Login Successfull", token,user});

  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
  }
}