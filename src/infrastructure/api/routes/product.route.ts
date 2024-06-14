import ListProductUseCase from "../../../usecase/product/list/list.product.use.case"
import express, { Request, Response } from 'express'
import ProductRepository from "../../product/repository/sequelize/product.repository"

export const productRouter = express.Router()


productRouter.get('/', async (request: Request, response: Response) => {

    try {
        const listUseCase = new ListProductUseCase(new ProductRepository());
        const output = await listUseCase.execute()

        response.status(200).send({ products: output.products });
    } catch (e) {
        response.status(500).send(`Error Occurred: ${e}`);
    }

})

