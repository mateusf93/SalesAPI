import { Request,Response } from "express"
import { ProductServices } from "../services/ProductServices"

const productService = new ProductServices()
export class ProductController{

    static async createProduct(req:Request, res:Response){
        const newProduct = req.body
        try{
            const createdProduct = await productService.insertData(newProduct)
            return res.status(201).json(createdProduct)
        }catch(error){
            console.log(error)
            return res.status(500)
        }
    }
    
    static async listProducts(req:Request, res:Response){
        try{
            const allProducts = await productService.listAllProducts()
            return res.status(200).send(allProducts)
            }catch(error){
            res.status(500).send(error)
        }
    }

    static async listProductsById(req:Request, res:Response){
        
        try{
            const {id}  = req.params
            const ProductById  = await productService.listProductId(id)
        return res.status(200).send(ProductById)
        }catch(error){
            res.status(404).send(error)
        }
    }

    static async updateProduct(req:Request, res:Response){
        const id = req.params.id
        const newInfo  = req.body
        try{
            const ProductUpdate = await productService.listById({id})
            await productService.updateData(ProductUpdate, newInfo)
            const ProductUpdated = await productService.listById({id})
            return res.status(200).json(ProductUpdated)
            }catch(error){
            res.status(500).send(error)
        }
    }

    static async deleteProduct(req:Request, res:Response){
        const productId = req.params.id
        try{
            await productService.deleteData(productId)
            return res.status(200).send("Produto deletado com sucesso")
        }catch(error){
            res.status(500).send(error)
        }
    }

    static async productCategory(req:Request, res:Response){
        try{
            const id  = req.params.id
            const listCategorysProducts  = await productService.categoryProducts(id)
  
            return res.send(listCategorysProducts)
        }catch(error){
            res.status(404).send(error)
        }
    }
}