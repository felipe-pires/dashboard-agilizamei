import { Fornecedor } from "../../fornecedor/fornecedor-read/fornecedor.model";
import { Usuario } from "../../usuario/usuario-read/usuario.model";

import { ItemCompra } from "./itemsCompra.model";

export interface Compra {
    id?: number;
    purchaseDate: Date;
    total: number;
    subTotal: number;
    user: Usuario;
    supplier: Fornecedor;
    itemsPurchases: ItemCompra[];
}