import { SignUpController } from './signup-controller'
import { HttpRequest } from '@/presentation/protocols'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { ok, serverError, badRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'
import { AuthenticationSpy, ValidationSpy, AddAccountSpy } from '@/presentation/test'
import faker from 'faker'

// const makeEmailValidatorWithError = (): EmailValidator => {
//   // stub => retorno fixo tipo de teste
//   class EmailValidatorStub implements EmailValidator {
//     isValid (email: string): boolean {
//       throw new Error()
//     }
//   }
//   return new EmailValidatorStub()
// }

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    // const emailValidatorStub = makeEmailValidatorWithError()
    // const sut = new SignUpController(emailValidatorStub)
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
  test('Should call AddAccount with correct values', async () => {
    // sistem under test
    const { sut, addAccountSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addAccountSpy.addAccountParams).toEqual({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })
  test('Should return 403 if AddAcount returns null', async () => {
    // sistem under test
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.accountModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
  test('Should return 200 if valid data is provided', async () => {
    // sistem under test
    const { sut, authenticationSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: authenticationSpy.token }))
  })
  test('Should call Validation with correct value', async () => {
    // sistem under test
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })
  test('Should return 400 if validation returns an error', async () => {
    // sistem under test
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authenticationSpy.authenticationParams).toEqual({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })
  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
