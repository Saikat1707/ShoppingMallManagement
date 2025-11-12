import axios from "./axiosConfig"
import { toast } from "react-toastify"


export const LoginAccount = async(email,password)=>{
    try {
        const data = await axios.post("/user/login",{email,password})
        console.log(data)
        toast.success("Log in successfull")
        return data.data
    } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
        throw new Error("Error in Backend : "+error.response.data.message)
    }
}

export const CreateAccount = async(name,email,password,phone,role)=>{
    try {
        const data = await axios.post("/user/signup",{name,email,password,phone,role})
        console.log(data)
        toast.success("Account created Successfully .. ")
        return data.data
    } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
        throw new Error("Error in Backend : "+error.response.data.message)
    }
}