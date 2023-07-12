import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class BuscaUsuarioId implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const existeUsuarioId = await this.usuarioRepository.existeComId(value);
    return existeUsuarioId;
  }
}

export const UsuarioEhValido = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: BuscaUsuarioId,
    });
  };
};
