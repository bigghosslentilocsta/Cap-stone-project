import exp from 'express'
import bcrypt from 'bcrypt'
import { authenticate, verifyToken } from '../services/authService.js'
import { UserTypeModel } from '../models/UserModel.js'
export const commonRouter=exp.Router()

//login
commonRouter.post("/login",async(req,res,next)=>{
    try {
            //get user obj from req
            let userObj = req.body
            //call authenticate
            let { token, user } = await authenticate(userObj.email, userObj.password)
            //save token as httponly cookie
            res.cookie("token", token, { httpOnly: true,
                sameSite: 'lax',
                secure: false
            })
            //send res
            res.status(200).json({ message: 'User authenticated', user, token })
        } catch (err) {
            next(err)
        }
})

//logout
commonRouter.post("/logout",async(req,res,next)=>{
     res.clearCookie("token", {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    })
    res.status(200).json({ message: 'Logged out successfully' })
});

//password changing
commonRouter.put("/change-password", verifyToken, async (req, res, next) => {
        const { currentPassword, newPassword } = req.body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'currentPassword and newPassword are required' })
        }

        const userId = req.user?.userId
        const user = await UserTypeModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' })
        }

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()

        res.status(200).json({ message: 'Password updated successfully' })
})