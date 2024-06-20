import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
   const {username, email, password} = req.body

   if(!username || !email || !password || username === '' || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'))
   }

   const hashedPassword = bcryptjs.hashSync(password, 10)

   const newUser = new User({username, email, password: hashedPassword})

   try {
      await newUser.save()
      res.json('Signup successfull')
   } catch (error) {
      next(error)
   }
}

export const signin = async (req, res, next) => {
   const {email, password} = req.body

   if(!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'))
   }

   try {
      const validUser = await User.findOne({email})

      if(!validUser) {
         next(errorHandler(404, "User not found"))
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password)
      if(!validPassword) {
         return next(errorHandler(400, 'Invalid password'))
      }

      const {password: pass, ...rest} = validUser._doc

      const accessToken = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
      const refreshToken = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
      res.cookie('access_blog_token', accessToken, {httpOnly: true, maxAge: 10 * 60 * 1000})
      res.cookie('refresh_blog_token', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true, sameSite: 'none'})
      res.status(200).json(rest)
   } catch (error) {
      next(error)
   }
}

export const google = async (req, res, next) => {
   const {email, name, googlePhotoUrl} = req.body

   try {
      const user = await User.findOne({email})
      if(user) {
         const {password, ...rest} = user._doc
         const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
         const refreshToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
         res.cookie('access_blog_token', accessToken, {httpOnly: true, maxAge: 10 * 60 * 1000})
         res.cookie('refresh_blog_token', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true, sameSite: 'none'})
         res.status(200).json(rest)
      } else{
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
         const newUser = new User({
           username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
           email,
           password: hashedPassword,
           profilePicture: googlePhotoUrl
         })
         await newUser.save()
         const {password, ...rest} = newUser._doc
         const accessToken = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
         const refreshToken = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
         res.cookie('access_blog_token', accessToken, {httpOnly: true, maxAge: 10 * 60 * 1000})
         res.cookie('refresh_blog_token', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true, sameSite: 'strict'})
         res.status(200).json(rest)
      }
   } catch (error) {
      next(error)
   }
}