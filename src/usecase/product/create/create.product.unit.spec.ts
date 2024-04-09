import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create customer use case", () => {

    it('Should create a product', async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const output = await useCase.execute({
            name: 'Test',
            type:'a',
            price: 10
        });

        expect(output)
        .toEqual({
            id: expect.any(String),
            name: 'Test',
            price: 10
        });


    })

    it('Should throw when name is missing', async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        expect(useCase.execute({
            name: '',
            type:'a',
            price: 10
        })).rejects
        .toThrow("Name is required");

    })
    it('Should throw when price is below zero', async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        expect(useCase.execute({
            name: 'Test',
            type:'a',
            price: -10
        })).rejects
        .toThrow("Price must be greater than zero");

    })

})