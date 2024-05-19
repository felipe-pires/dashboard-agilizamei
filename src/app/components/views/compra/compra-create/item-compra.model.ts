export interface ItemCompra{
    id?: number;
    product: Produto;
    amount: number;
    discount: number;
    finalPrice: number;
}

export interface Produto {
    id?: number;
  }