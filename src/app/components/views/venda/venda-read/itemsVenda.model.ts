import { Produto } from "../../produto/produto-read/produto.model";

export interface ItemVenda{
    id?: number;
    product: Produto;
    amount: number;
    discount: number;
    finalPrice: number;
}