const router = require('express').Router();
const { render } = require('../app');
const Blog = require('../models/Blog')

// Your routing code goes here


router.post("/blog",async(req, res)=>{
      try{
      let blog1 = new Blog( req.body);
      let createBlog = blog1.save();
      res.status(201).json(createBlog);

      }catch(err){
        res.status(400).send(err);
      }
})


router.get("/blog" , async(req, res)=>{
    try{
        let page = req.query.page;
        let serachTitle = await  Blog.find({topic:new RegExp(req.query.search, "i")});
        if(serachTitle.length){
            let pagination = serachTitle.slice((page-1)*5 );
            if(pagination.length){
                res.json(pagination);
            }else{
                res.status(400).send("no such result found");
            }
        }else{
            res.status(400).send("no such result found");  
        }
    }catch(err){
        res.status(400).send(err);
    }
})




router.put("/blog/:id", async(req, res)=>{
    try{
        let _id = req.params.id;
        let update=req.body.name
        let updatedData = await Blog.findByIdAndUpdate(_id,req.body,{new:true} );
        res.send(updatedData)
    }catch(err){
        res.status(400).send(err);
    }
})


router.delete("/blog/:id" , async(req, res)=>{
    try{
       let deletedData =await Blog.findByIdAndDelete(req.params.id);
       res.send(deletedData)
    }
    catch(err){
        res.status(400).send(err);
    }
})


router.get('/blog',(req,res)=>{
    res.json({ok:'blog'})
})




module.exports = router;