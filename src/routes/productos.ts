import express, { Router } from "express";
import {faker} from '@faker-js/faker';
faker.locale='es'

const router: Router = express.Router();

let productos = [

    {

        "name": faker.commerce.productName(),

        "price": faker.commerce.price()
    },
    {

        "name": faker.commerce.productName(),

        "price": faker.commerce.price()

    },
    {

        "name": faker.commerce.productName(),

        "price": faker.commerce.price()
    },
    {

        "name": faker.commerce.productName(),

        "price": faker.commerce.price()
    },
    {

        "name": faker.commerce.productName(),

        "price": faker.commerce.price()
    }
]

router.get("/productos-test", async(req,res,next)=>{
    //res.render('datos', { productos }) 
    res.send(productos)
})

export default router