import Product from "../../../domain/product/entity/product"
import ListProductUseCase from "./list.product.use.case";


const product =  new Product("123", "product1", 10);
const product2 =  new Product("124", "product2", 20);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product, product2]),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('List Product Usecase unit Test',()=>{

    it('Should list products',async ()=>{
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository)

        const output = await useCase.execute()

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe("123")
        expect(output.products[0].name).toBe("product1")
        expect(output.products[0].price).toBe(10)
        
        
        expect(output.products[1].id).toBe("124")
        expect(output.products[1].name).toBe("product2")
        expect(output.products[1].price).toBe(20)

    })
})