export interface Produto {
    id?: number;
    name: string;
    description: string;
    price: number;
    cost: number;
    expirationDate: Date
    amount: number;
    typeProduct: string;
}