export interface InputListProductDto {}

type Product = {
  id: string;
  name: string;
  price: Number;
};

export interface OutputListProductDto {
  products: Product[];
}
