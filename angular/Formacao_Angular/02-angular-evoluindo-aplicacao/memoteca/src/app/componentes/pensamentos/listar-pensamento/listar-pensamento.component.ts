import { BotaoCarregarMaisComponent } from './botao-carregar-mais/botao-carregar-mais.component';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { CommonModule } from '@angular/common';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-pensamento',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, PensamentoComponent, BotaoCarregarMaisComponent],
  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css'
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = ''
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(
    private service: PensamentoService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length) {
        this.haMaisPensamentos = false;
      }
    })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos';
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos;
      this.listaFavoritos = listaPensamentosFavoritos;
    });
  }

  recarregarComponente() {
    this.titulo = 'Meu Mural';
    this.favoritos = false;
    this.paginaAtual = 1;
    //location.reload();
    // this.router.onSameUrlNavigation = 'reload';
    console.log(`Route before refresh on: ${this.router.url}`);
    const url = this.router.url;

    this.ngOnInit();

    // this.router.navigateByUrl(`/`, { skipLocationChange: false}).then(() => {
    //   this.router.navigate([`/${url}`], {skipLocationChange: false}).then(() => {
    //     console.log(`Route refreshed on: ${this.router.url}`);
    //   });
    // });
  }
}
