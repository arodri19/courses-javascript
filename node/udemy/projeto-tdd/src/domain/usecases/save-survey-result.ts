import { SurveyResultModel } from '@/domain/models'

export interface SaveSurveyResult {
  save: (data: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}

export namespace SaveSurveyResult {
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }
  export type Result = SurveyResultModel
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
