import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  @Input() itemQqueVaiSerEditado!: Item;
  editando = false;
  textoBtn = 'Salvar item';

  valorItem!: string;
  constructor(
    private listaService: ListaDeCompraService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['itemQqueVaiSerEditado'].firstChange) {
      this.editando = true;
      this.textoBtn = 'Editar item';
      this.valorItem = this.itemQqueVaiSerEditado?.nome;
    }
  }

  ngOnInit(): void { }

  adicionarItem(): void {
    this.listaService.adicionarItemNaLista(this.valorItem);
    this.limparCampo();
  }

  limparCampo(): void {
    this.valorItem = '';
  }

  editarItem(): void {
    this.listaService.editarItemDaLista(this.itemQqueVaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = 'Salvar item';
  }

  
}
