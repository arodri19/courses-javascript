import { SurveyModel } from '@/domain/models/'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add: (data: AddSurveyParams) => Promise<void>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
