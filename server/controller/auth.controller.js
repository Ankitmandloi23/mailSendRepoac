const User = require('../model/user.model');
const authservice = require('../service/auth.service');



// exports.signup = async (req, res) => {
//     try {

//         const { userName, email, password } = req.body;
//         const craetedUser = await authservice.signupCreateUser(email, userName, password);
//         if (!craetedUser) {
//             res.status(200).json({
//                 message: 'User Doesn\'t created',
//                 craetedUser
//             });
//         }



//         res.status(200).json({
//             message: 'Signup successful',
//             craetedUser
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: 'Internal Server Error',
//             error: err.message
//         })
//     }
// }

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authservice.checkUser(email);
   
        if (!user) {
            throw new Error("USER NOT FOUND");
        }
   
        const comparePassword = await authservice.comparePassword(user, password);

        if (!comparePassword) {
            throw new Error("INVALID CREDENTIALS");
        }
      
        res.status(200).json({
            message: 'Login Successful',
            ...comparePassword
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }

}