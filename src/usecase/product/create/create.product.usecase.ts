import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase{

    private repository:ProductRepositoryInterface;


    constructor(repository: ProductRepositoryInterface){
        this.repository = repository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto>{
        const product = ProductFactory.create(input.type,
            input.name, input.price)

        if(product.notification.hasErrors())    

        await this.repository.create(product as Product);    
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }

}