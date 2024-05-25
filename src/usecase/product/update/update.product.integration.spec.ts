import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import Product from "../../../domain/product/entity/product"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import UpdateProductUseCase from "./update.product.use.case"

describe('Update product integration test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize(
            {
                dialect: 'sqlite',
                storage: ':memory:',
                sync: { force: true },
                logging: false
            }
        )
        await sequelize.addModels([ProductModel]);
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('Should update a product', async () => {
        const productRepository = new ProductRepository()
        const updateProductUseCase = new UpdateProductUseCase(productRepository)

        const product = new Product("123", "teste", 10);
        productRepository.create(product)

        const input = {
            id: product.id,
            name: "teste2",
            price: 20
        }

        await updateProductUseCase.execute(input)

        const updatedProduct = await productRepository.find(product.id)

        expect(updatedProduct.name).toBe('teste2')
        expect(updatedProduct.price).toBe(20)
    })
})