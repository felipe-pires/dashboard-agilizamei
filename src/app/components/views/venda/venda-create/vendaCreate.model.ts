import { AddItem } from './addItem.model';

export interface VendaCreate {
  id?: number;
  customer: Cliente;
  itemsSale: AddItem[];
}

export interface Cliente {
  id?: number;
}
