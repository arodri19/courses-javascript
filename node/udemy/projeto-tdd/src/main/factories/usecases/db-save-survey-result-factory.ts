import { SaveSurveyResult } from '@/domain/usecases/'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result-mongo-repository'
import { DbSaveSurveyResult } from '@/data/usecases/'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
