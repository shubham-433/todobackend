import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export  const getPost= async(req,res)=>{
    try {
        const postMessage=await PostMessage.find()
        // console.log(postMessage)
        
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage(post)
    try {
      await newPost.save()
      res.status(201).json(newPost)
    } catch (error) {
       res.status(409).json({"message":error.message}) 
    }
}
export const updatedPost=async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body
    // console.log(post)
    try {
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with this id")
        const  updatedPost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
        console.log(updatedPost)
        res.status(201).json(updatedPost)
    } catch (error) {
       res.status(409).json({"message":error}) 
    }
}
export const deletePost=async(req,res)=>{
    console.log("delete")
    const {id}=req.params;
    try {
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")

    await PostMessage.findByIdAndRemove(id)
    console.log("delete success")
    res.status(201).json({message:"Deleted Successully"})
} catch (error) {
       res.status(409).json({"message":error}) 
    }
}


export const likePost =async(req,res)=>{
    const {id}=req.params
   try {
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")
    const post=PostMessage.findById(id);
    const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:1},{new:true})
    res.json(updatedPost)
   } catch (error) {
    console.log(error.message)
   }
}   