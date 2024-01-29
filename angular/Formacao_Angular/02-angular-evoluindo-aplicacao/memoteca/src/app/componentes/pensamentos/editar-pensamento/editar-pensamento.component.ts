import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { minusculoValidator } from './minusculoValidator';

@Component({
  selector: 'app-editar-pensamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css'
})
export class EditarPensamentoComponent implements OnInit {
  // pensamento: Pensamento = {
  //   id: 0,
  //   conteudo: '',
  //   autoria: '',
  //   modelo: ''
  // }

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          minusculoValidator
        ])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]
      })
    })
  }



  editarPensamento() {
    console.log(this.formulario.get('autoria')?.errors)
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    }

    return 'botao__desabilitado'
  }
}
