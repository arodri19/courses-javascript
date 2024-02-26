import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/iItem';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnChanges, OnDestroy {

  @Input() item!:Item;
  @Output() emitindoItemParaEditar = new EventEmitter();
  @Output() emitindoIdParaDeletar = new EventEmitter();
  
  faPen = faPen;
  faTrash = faTrash;

  constructor() { }
  
  ngOnInit(): void {
    console.log('On init');
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('On changes');
  }

  editarItem(): void {
    this.emitindoItemParaEditar.emit(this.item);
    console.log('Editando item');
  }

  checarItem(): void {
    if(this.item.comprado == true){
      this.item.comprado = false;
    }else{
      this.item.comprado = true;
    }
  }

  deletarItem(): void {
    console.log('Deletando item');
    this.emitindoIdParaDeletar.emit(this.item.id);
  }

  ngOnDestroy(): void { 
    console.log('On destroy');
  }
}
