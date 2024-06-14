import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { app, sequelize } from "../express";
import request from "supertest";

describe('Product end to end test',()=>{


    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

    it('shoul list products',async ()=>{

        const product = new Product('1','teste',10)
        await new ProductRepository().create(product)

        const response = await request(app)
        .get("/products")
        
        expect(response.status).toBe(200)
        expect(response.body.products.length).toBe(1)

    })

})