import { Routes } from '@angular/router';
import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';
import { ExcluirPensamentoComponent } from './componentes/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './componentes/pensamentos/editar-pensamento/editar-pensamento.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'listarPensamento',
  pathMatch: 'full',
},
{
  path: 'criarPensamento',
  component: CriarPensamentoComponent
},
{
  path: 'listarPensamento',
  loadComponent: () => import('./componentes/pensamentos/listar-pensamento/listar-pensamento.component').then(m => m.ListarPensamentoComponent)
  // component: ListarPensamentoComponent
},
{
  path: 'pensamentos/excluirPensamento/:id',
  component: ExcluirPensamentoComponent
},
{
  path: 'pensamentos/editarPensamento/:id',
  component: EditarPensamentoComponent
}
];

export { routes };