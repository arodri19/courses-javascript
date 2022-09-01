export const badRequest = {
  description: 'Requisição inálida',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
