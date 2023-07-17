// import { IsOptional } from 'class-validator';
import { CriaUsuarioDTO } from './CriaUsuario.dto';
import { PartialType } from '@nestjs/mapped-types';

// export class AtualizaUsuarioDTO extends CriaUsuarioDTO {
//   @IsOptional()
//   nome: string;

//   @IsOptional()
//   email: string;

//   @IsOptional()
//   senha: string;
// }

export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) {}
