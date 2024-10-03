const { PrismaClient } = require("@prisma/client");
const express = require("express");

const app = express();

app.use(express.json())

const prisma = new PrismaClient

app.get("/test",(req,res)=>{
    res.json({message:"Test"})
})

app.get("/",async(req,res)=>{
    const getdata =await prisma.techx.findMany();

    res.json({message:"get data",data:getdata})

})

app.post("/", async (req,res)=>{
    const data = req.body
    const postdata =await prisma.techx.create(
        {
            data:{
            ...data
            }
        }
    )

    res.json({message:"post data", data:postdata})
})

app.listen(3000);