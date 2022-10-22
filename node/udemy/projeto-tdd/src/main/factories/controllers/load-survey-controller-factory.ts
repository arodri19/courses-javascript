import { LoadSurveysController } from '@/presentation/controllers/'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/'
import { makeDbLoadSurveys } from '@/main/factories/usecases/'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
