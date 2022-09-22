import { SurveyResultModel } from '@/domain/models/'

export interface LoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
