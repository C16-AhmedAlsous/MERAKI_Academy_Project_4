const cartModel=require("../routes/cartRouter")

const addToCart= (req,res,next)=>{
    
    const {userId,productId}= req.body
    const cart = cartModel.findOne({user}).then((result)=>{
        if(!cart){
            return res.status(404).json(":can't find item")
        }
    })
        
}