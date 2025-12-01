
const authorization = (text) =>{
    return (req,res,next)=>{
        const permission = req.token.permissions
        console.log(permission.includes(text));
        if(!permission.includes(text)){
            res.status(401).json({message :"unauthorized"})
        }else{
            next()
        }
    }
}

module.exports= authorization