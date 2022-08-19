const express=require("express");
const { signup, login } = require("../Handlers/UsersHandler");

const UsersRouter=express.Router();

UsersRouter.post("/register",signup);
UsersRouter.post("/login",login);

module.exports=UsersRouter;