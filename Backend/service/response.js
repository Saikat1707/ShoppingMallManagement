export const goodResponse = (res,message,data)=>{
    return res.status(200).json({
        success:true,
        message:message,
        backendData:data
    })
}

export const badResponse = (res,message,data=null) =>{
    return res.status(400).json({
        success:false,
        message,
        backendData:data
    })
}