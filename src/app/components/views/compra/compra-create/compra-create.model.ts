import { AddItem } from "./addItem.model";

export interface CompraCreate {
  id?: number;
  user: Usuario;
  fornecedor: Fornecedor;
  itemsPurchase: AddItem[];
}

export interface Usuario {
  id?: number;
}

export interface Fornecedor {
    id?: number;
  }
