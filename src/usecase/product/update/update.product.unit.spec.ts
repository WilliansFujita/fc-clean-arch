import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.use.case"

const product = new Product("123", "teste", 10)

const input = {
    id: product.id,
    name: "Teste2",
    price: 20
}

const MockRepository = () => {

    return {
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Update Product Use Case Unit Test', () => {

    test('Should update a product', async () => {
        const usecase = new UpdateProductUseCase(MockRepository())

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})