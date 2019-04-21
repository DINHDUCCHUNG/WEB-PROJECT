const express = require('express');
const productionRouter = express();
const ProductionModel = require('./models')

productionRouter.post('/',async(req,res)=>{
    try{
        if(!req.session.admin){
            res.status(403).json({
                message: "Unauthenticated",
            });
        }else{
            const productionInfo = req.body;
        const newProduction = await ProductionModel.create(productionInfo);
        res.status(201).json(newProduction);
        }
    }catch(error){
        res.status(500).end(error.message);
    }
});

productionRouter.get('/:productionId', async(req,res)=>{
    try{
        const {productionId} = req.params;
        const productionInfo = await ProductionModel.findById(productionId).exec();
        res.status(200).json(productionInfo);
    }catch(error){
        res.status(500).end(error.message);
    }
});

productionRouter.get('/',async(req,res)=>{
    try{
        const {pageNumber, pageSize} = req.query;
        const data = await ProductionModel.find()
        .skip(pageSize*(pageNumber-1))
        .limit(Number(pageSize))
        .exec();
        res.status(200).json(data);
    }catch(error){
        res.status(500).end(error.message);
    }
});

module.exports = productionRouter;