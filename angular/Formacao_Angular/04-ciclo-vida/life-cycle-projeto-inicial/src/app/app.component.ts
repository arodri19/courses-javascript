import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'app-lista-de-compras';
  listaDeCompra!:Array<Item>;
  itemParaSerEditado!:Item;
  
  constructor(
    private listaService: ListaDeCompraService
  ) { }

  ngDoCheck(): void {
    console.log('Verificando mudanças');
    this.listaService.atualizarLocalStorage();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.listaDeCompra = this.listaService.getListaDeCompra();
    console.log(this.listaDeCompra);
  }

  editarItem(item: Item): void {
    this.itemParaSerEditado = item;
    console.log('Editando item', item);
  }

  deletarItem(id: number): void {
    const index = this.listaDeCompra.findIndex(item => item.id === id);
    this.listaDeCompra.splice(index,1);
    console.log('Deletando item', id);
  }

  limparLista(): void {
    this.listaDeCompra = [];
    console.log('Limpando lista');
  }
}
