import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(
    private service: LivroService
  ) { }

  // totalDelivros$ = this.campoBusca.valueChanges.pipe(
  //   debounceTime(PAUSA),
  //   filter((valorDigitado) => valorDigitado.length >= 3 || valorDigitado.length === 0),
  //   tap(() => console.log('Fluxo inicial')),
  //   distinctUntilChanged(),
  //   switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
  //   map((resultado) => this.livrosResultado = resultado),
  //   catchError((error) => {
  //     console.log(error);
  //     return of();
  //     // this.mensagemErro = 'Ops ocorreu um erro. Recarregue a aplicação';
  //     // return EMPTY;
  //     // console.log('Erro', error);
  //     // return throwError(() => new Error(this.mensagemErro = 'Ops ocorreu um erro. Recarregue a aplicação'));  
  //   })
  // )

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3 || valorDigitado.length === 0),
    tap(() => console.log('Fluxo inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((resultado) => this.livrosResultado = resultado),
    map(resultado => resultado?.items || []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((error) => {
      this.mensagemErro = 'Ops ocorreu um erro. Recarregue a aplicação';
      return EMPTY;
      // console.log('Erro', error);
      // return throwError(() => new Error(this.mensagemErro = 'Ops ocorreu um erro. Recarregue a aplicação'));  
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    
    })
  }
}



