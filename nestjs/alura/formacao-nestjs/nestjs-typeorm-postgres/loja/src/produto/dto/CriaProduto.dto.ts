import {
  ValidateNested,
  IsArray,
  IsNotEmpty,
  Min,
  MaxLength,
  ArrayMinSize,
  IsNumber,
  IsUUID,
  IsUrl,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;
  
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0, { message: 'O valor com valores decimais incorretos' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'A quantidade minima tem que ser maior que 0' })
  quantidade: number;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(1000, {
    message: 'A descrição precisa ter pelo menos 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  @ArrayMinSize(3)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @Type(() => ImagemProdutoDTO)
  @ArrayMinSize(1)
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
  categoria: string;
}

export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'URL para imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
}

export class CaracteristicaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;
}

