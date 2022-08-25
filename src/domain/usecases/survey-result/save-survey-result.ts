import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
