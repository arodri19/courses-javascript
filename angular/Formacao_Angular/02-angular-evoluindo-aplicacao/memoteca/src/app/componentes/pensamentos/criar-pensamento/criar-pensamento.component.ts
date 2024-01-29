import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { CommonModule } from '@angular/common';
import { minusculoValidator } from './minusculoValidator';

@Component({
  selector: 'app-criar-pensamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css',
})
export class CriarPensamentoComponent implements OnInit {
  // pensamento: Pensamento = {
  //   conteudo: '',
  //   autoria: '',
  //   modelo: 'modelo1'
  // }

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        minusculoValidator
      ])],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }

  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors)
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      });
    }
  }
  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    }

    return 'botao__desabilitado'
  }
}
