import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase{

    repository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this.repository = repository;
    }


    async execute(input: InputFindProductDto): Promise<OutputFindProductDto>{
        const productFound = await this.repository.find(input.id)
        if(!productFound){
            throw new Error("product not found");
        }

        return {
            id: productFound.id,
            name: productFound.name,
            price: productFound.price
        }
    }
    
}