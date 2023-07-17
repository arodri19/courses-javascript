import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

// @Catch(HttpException)
// export class FiltroDeExcecaoHttp implements ExceptionFilter {
//   catch(excecao: HttpException, host: ArgumentsHost) {
//     console.log(excecao);
//     const contexto = host.switchToHttp();
//     const resposta = contexto.getResponse<Response>();

//     const status = excecao.getStatus();
//     const body = excecao.getResponse();

//     resposta.status(status).json(body);
//   }
// }

@Catch()
export class FiltroDeExcecaoGlobal implements ExceptionFilter {
  constructor(private adapterHost: HttpAdapterHost) {}

  catch(excecao: unknown, host: ArgumentsHost) {
    console.log(excecao);

    const { httpAdapter } = this.adapterHost;

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requisicao = contexto.getRequest();

    const { status, body } =
      excecao instanceof HttpException
        ? { status: excecao.getStatus(), body: excecao.getResponse() }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(requisicao),
            },
          };

    httpAdapter.reply(resposta, body, status);
  }
}
