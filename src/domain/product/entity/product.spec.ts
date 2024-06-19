import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    const product = new Product("", "Product 1", 100);

    expect(product.notification.hasErrors()).toBe(true)
    expect(product.notification.getErrors()[0].message).toBe("Id is required")
    
  });

  it("should throw error when name is empty", () => {
    const product = new Product("123", "", 100);

    expect(product.notification.hasErrors()).toBe(true)
    expect(product.notification.getErrors()[0].message).toBe("Name is required")
  
  });

  it("should throw error when price is less than zero", () => {
    const product = new Product("123", "Name", -1);
    expect(product.notification.hasErrors()).toBe(true)
    expect(product.notification.getErrors()[0].message).toBe("Price must be greater than zero")
  });

  it("should throw errors when name is empty and id is empty", () => {
    const product = new Product("", "", 100);

    expect(product.notification.hasErrors()).toBe(true)
    expect(product.notification.getErrors()[0].message).toBe("Id is required")
    expect(product.notification.getErrors()[1].message).toBe("Name is required")
  
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
