import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-botao-carregar-mais',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './botao-carregar-mais.component.html',
  styleUrl: './botao-carregar-mais.component.css'
})
export class BotaoCarregarMaisComponent implements OnInit {
  @Input() haMaisPensamentos: boolean = false;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
