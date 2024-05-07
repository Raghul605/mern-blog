import User from "../user.module.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req,res,next) => {
    const {username , email, password } = req.body;
    if( !username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, 'All fiels are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json('Signup successfull');
    } catch (error) {
        next(error);
    }
}