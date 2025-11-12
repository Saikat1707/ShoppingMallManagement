import bcrypt from "bcrypt"

export const hashThePassword = async (password)=>{
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if(hashedPassword) return hashedPassword
    } catch (error) {
        console.log(error.message)
        throw new Error("Error while hashing the password : " + error.message);
    }
}

export const comparePassword = async(password,hashPass)=>{
    try {
        return await bcrypt.compare(password, hashPass)
    } catch (error) {
        console.log(error.message)
        throw new Error("Error in comparing password : "+error.message)
    }
}