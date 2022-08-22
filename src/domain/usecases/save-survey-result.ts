import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  add: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
