import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/'
import { makeDbLoadSurveyResult, makeDbLoadSurveyById } from '@/main/factories/usecases/'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
