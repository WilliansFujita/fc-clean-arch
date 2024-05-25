import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "../create/create.product.usecase"
import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase"

describe('find product integration test', () => {
    let sequelize: Sequelize

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async ()=>{
        await sequelize.close();
    })

    it('should find a product', async () => {
        const productRepository = new ProductRepository()
        const useCase = new FindProductUseCase(productRepository);

        const product = new Product("123", "teste", 10);
        productRepository.create(product)

        const output = await useCase.execute({id: product.id})

        expect(output.id).toBe(product.id)
        expect(output.name).toBe(product.name)
        expect(output.price).toBe(product.price)

    })
})