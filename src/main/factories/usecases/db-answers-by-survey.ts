import { SurveyMongoRepository } from '@/infra/db/mongodb/'
import { DbLoadAnswersBySurvey } from '@/data/usecases/'
import { LoadAnswersBySurvey } from '@/domain/usecases/'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
