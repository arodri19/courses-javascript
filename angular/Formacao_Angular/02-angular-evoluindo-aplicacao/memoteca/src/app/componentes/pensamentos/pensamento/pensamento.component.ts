import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { RouterLink } from '@angular/router';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent {
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'André',
    modelo: 'modelo3',
    favorito: false
  }

  constructor(private service: PensamentoService){}

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string {
    if(this.pensamento.favorito === false){
      return 'inativo'
    }
    return 'ativo'
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe()
  }
}
