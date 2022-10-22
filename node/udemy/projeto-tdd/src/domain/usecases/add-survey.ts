import { SurveyModel } from '@/domain/models/'

export interface AddSurvey {
  add: (data: AddSurvey.Params) => Promise<void>
}

export namespace AddSurvey {
  export type Params = Omit<SurveyModel, 'id'>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
