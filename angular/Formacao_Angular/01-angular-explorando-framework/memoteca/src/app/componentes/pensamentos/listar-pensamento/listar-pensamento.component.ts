import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PensamentoComponent } from '../pensamento/pensamento.component';
import { NgFor, NgIf } from '@angular/common';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-listar-pensamento',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, PensamentoComponent],
  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css'
})
export class ListarPensamentoComponent {
  listaPensamento: Pensamento[] = [];
}
