import { Cliente } from "../../cliente/cliente-read/cliente.model";
import { ItemVenda } from "./itemsVenda.model";

export interface Venda {
    id?: number;
    saleDate: Date;
    total: number;
    subTotal: number;
    customer: Cliente;
    itemsSale: ItemVenda[];
}