import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResult {
  load: (surveyId: string) => Promise<SurveyResultModel>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
