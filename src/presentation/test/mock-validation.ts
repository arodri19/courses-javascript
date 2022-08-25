import { Validation } from '@/presentation/protocols'

export const mockValidation = (): Validation => {
  // stub => retorno fixo tipo de teste
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
