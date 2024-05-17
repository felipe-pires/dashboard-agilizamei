import { Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { ProdutoReadComponent } from './components/views/produto/produto-read/produto-read.component';
import { ProdutoCreateComponent } from './components/views/produto/produto-create/produto-create.component';
import { ProdutoDeleteComponent } from './components/views/produto/produto-delete/produto-delete.component';
import { ProdutoUpdateComponent } from './components/views/produto/produto-update/produto-update.component';
import { LoginComponent } from './components/views/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { ClienteReadComponent } from './components/views/cliente/cliente-read/cliente-read.component';
import { ClienteCreateComponent } from './components/views/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/views/cliente/cliente-delete/cliente-delete.component';
import { ClienteUpdateComponent } from './components/views/cliente/cliente-update/cliente-update.component';
import { UsuarioReadComponent } from './components/views/usuario/usuario-read/usuario-read.component';
import { UsuarioCreateComponent } from './components/views/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/views/usuario/usuario-delete/usuario-delete.component';
import { UsuarioUpdateComponent } from './components/views/usuario/usuario-update/usuario-update.component';
import { VendaReadComponent } from './components/views/venda/venda-read/venda-read.component';
import { VendaCreateComponent } from './components/views/venda/venda-create/venda-create.component';
import { VendaDeleteComponent } from './components/views/venda/venda-delete/venda-delete.component';
import { VendaUpdateComponent } from './components/views/venda/venda-update/venda-update.component';
import { ReportComponent } from './components/views/reports/report/report.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "home",
        component: HomeComponent,
       // canActivate: [AuthGuard]
    },
    {
        path: "produtos",
        component: ProdutoReadComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "produtos/create",
        component: ProdutoCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "produtos/delete/:id",
        component: ProdutoDeleteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "produtos/update/:id",
        component: ProdutoUpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "clientes",
        component: ClienteReadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "clientes/create",
        component: ClienteCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "clientes/delete/:id",
        component: ClienteDeleteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "clientes/update/:id",
        component: ClienteUpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "usuarios",
        component: UsuarioReadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "usuarios/create",
        component: UsuarioCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "usuarios/delete/:id",
        component: UsuarioDeleteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "usuarios/update/:id",
        component: UsuarioUpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "vendas",
        component: VendaReadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "vendas/create",
        component: VendaCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "vendas/delete/:id",
        component: VendaDeleteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "vendas/update/:id",
        component: VendaUpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "relatorios",
        component: ReportComponent,
        canActivate: [AuthGuard]
    }
];
