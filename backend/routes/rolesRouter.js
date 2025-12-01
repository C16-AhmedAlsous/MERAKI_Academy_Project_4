const express = require("express")
const rolesRouter = express.Router()
const {createNewRole} =require("../controllers/role")



rolesRouter.post("/", createNewRole);

module.exports=rolesRouter