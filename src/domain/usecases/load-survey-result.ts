import { SurveyResultModel } from '@/domain/models/'

export interface LoadSurveyResult {
  load: (surveyId: string, accountId: string) => Promise<LoadSurveyResult.Result>
}

export namespace LoadSurveyResult {
  export type Result = SurveyResultModel
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
