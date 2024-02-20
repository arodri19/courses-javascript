import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
    ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid){
      this.router.navigate(['/sucesso']);
    }else{
      alert('Formulário inválido');
    }
    console.log(form.controls);
  }

  consultaCep(ev: any, f: NgForm){
    const cep = ev.target.value
    if(cep !== ""){
      this.consultaCepService.getConsultaCep(cep).subscribe((resultado: any) => {
        console.log(resultado);
        this.populandoEndereco(resultado, f);
      });
    }
  }

  populandoEndereco(resultado: any, f: NgForm){
    f.form.patchValue({
      endereco: resultado.logradouro,
      bairro: resultado.bairro,
      complemento: resultado.complemento,
      cidade: resultado.localidade,
      estado: resultado.uf
    });
  }
}
