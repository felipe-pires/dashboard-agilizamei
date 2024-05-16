import { ItemVenda } from "./itemsVenda.model";


export interface VendaCreate {
    id?: number;
    customer: Cliente;
    itemsSale: ItemVenda[];
}

export interface Cliente {
    id?: number;
  }
