import { AddItem } from './addItem.model';

export interface CompraCreate {
  id?: number;
  user: Usuario;
  supplier: Fornecedor;
  itemsPurchases: AddItem[];
}

export interface Usuario {
    id?: number;
  }

  
  export interface Fornecedor {
    id?: number;
  }
  