const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// exports.signupCreateUser = async (email, userName, password) => {
//     try {
//         const saltRound = 10;
//         const hashedPass = await bcrypt.hash(password, saltRound);

//         const already = await User.findOne({ email });
//         if (already) {
//             throw new Error("User Already Exist!");
//         }

//         const data = {
//             email,
//             userName,
//             password: hashedPass
//         }


//         const created = await User.create(data);
//         return created;
//     } catch (err) {
//         console.log(err)
//         throw err;
//     }
// }


exports.checkUser = async (email) => {
    const user = await User.findOne({ email });
    return user;
}


exports.comparePassword = async (user, password) => {
    const passMated = await bcrypt.compare(password, user.password);
    if (!passMated) return false;
    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
        SECRET_KEY,
        { expiresIn: '1d' }
    );

    return {
        user: {
            id: user._id,
            email: user.email,
            name: user.userName,
        },
        token,
    };
}