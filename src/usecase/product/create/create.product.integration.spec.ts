import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "./create.product.usecase"

describe('Create Product Integration Test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        await sequelize.addModels([ProductModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('Should create a product', async () => {
        const productRepository = new ProductRepository()
        const useCase = new CreateProductUseCase(productRepository);

        const input = {
            type: "a",
            name: "Teste",
            price: 35
        }

        const output = await useCase.execute(input)

        const product = await productRepository.find(output.id)

        expect(product.id).toBe(output.id)
        expect(product.name).toBe("Teste")
        expect(product.price).toBe(35)

    });

})