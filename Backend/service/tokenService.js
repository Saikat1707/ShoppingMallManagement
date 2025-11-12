import jwt from "jsonwebtoken"


export const generateToken = async (userId , userRole)=>{
    try {
        const token = await jwt.sign(
            { id: userId, role: userRole },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return token;
    } catch (error) {
        console.log(error.message)
        throw new Error("Error in generating token : "+error.message)
    }
}