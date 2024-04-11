import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase{

    repository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this. repository = repository
    }

    async execute(): Promise<OutputListProductDto>{
        const products = await this.repository.findAll()
        return {
            products
        }
    }
}