import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "teste", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};


describe('Find Product use Case unit test', () => {

    it('Should find a product', async () => {

        const productMockRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productMockRepository);

        const input = { id: "123" }

        const output = {
            id: "123",
            name: "teste",
            price: 10
        }

        const result = await findProductUseCase.execute(input)

        expect(result).toStrictEqual(output)
    })


    it('Should throw when product not found', () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("product not found");
        });
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("product not found");
    })

})


