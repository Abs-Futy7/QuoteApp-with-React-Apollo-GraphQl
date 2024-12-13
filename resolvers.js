
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';
import { User } from './models/User.js';
import { Quote } from './models/Quotes.js'



export const resolvers = {
    Query:{
        users:async () => await User.find({}),
        user:async (_,{_id})=> await User.findOne({_id}),
        quotes:async ()=>await Quote.find({}).populate("by","_id firstName"),
        iquote:async (_,{by})=> await Quote.find({by}),
        myprofile:async (_,args,{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            return await User.findOne({_id:userId})
           }
    },
    User:{
        quotes:async (ur)=> await Quote.find({by:ur._id})
     },

     Mutation:{
        signupUser:async (_,{userNew})=>{
            const user = await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exists with that email")
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(userNew.password,salt);
            const newUser = await new User({...userNew,password:hash}).save();
            return newUser
        },

        signinUser: async (_, {userSignin}) =>{
            const user = await User.findOne({email:userSignin.email})
            if(!user){
                throw new Error("User not found")
            }
            const checkPassword = bcrypt.compareSync(userSignin.password, user.password);
            if(!checkPassword){
                throw new Error("Invalid Password")
            }
            const token = jwt.sign({user_id:user._id}, JWT_SECRET);

            return {token}
        },

        createQuote: async (_, {name}, {user_id}) =>{
            if(!user_id){
                throw new Error("Unauthorized")
            }
            const newQuote = new Quote({name, by:user_id});
            await newQuote.save();

            return "Quote saved successfully"

        }
    }
}